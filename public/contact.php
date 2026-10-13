<?php
/**
 * NH Cargo – simple PHP mailer for the contact / quote form.
 *
 * Use this ONLY if the site runs on PHP-capable shared hosting and you do not
 * want to use Formspree. Setup:
 *   1. In src/data/site.ts set  formEndpoint: '/contact.php'  (or PUBLIC_FORM_ENDPOINT=/contact.php)
 *   2. Adjust the settings below (recipient, sender address on YOUR domain).
 *   3. npm run build, upload the dist/ folder – this file is copied there automatically.
 *
 * Note: PHP mail() deliverability depends on the host (SPF/DKIM). For best
 * results ask the host for SMTP details and switch to PHPMailer.
 */

declare(strict_types=1);

// ---- Settings ---------------------------------------------------------------
const MAIL_TO = 'info@nhcargo.hu';                 // TODO: recipient address
const MAIL_FROM = 'no-reply@nhcargo.hu';           // TODO: must be an address on the hosting domain
const MIN_SECONDS = 3;                             // time trap: faster submissions are treated as bots
// Redirect targets for visitors without JavaScript (HU / EN contact page)
$contactPage = (($_POST['language'] ?? '') === 'en') ? '/en/contact/' : '/kapcsolat/';
define('REDIRECT_OK', $contactPage . '?sent=1#quote-form');
define('REDIRECT_ERROR', $contactPage . '?error=1#quote-form');
// -----------------------------------------------------------------------------

$wantsJson = str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json');

function respond(bool $ok, int $status, string $redirect, bool $json): void
{
    http_response_code($status);
    if ($json) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['ok' => $ok]);
    } else {
        header('Location: ' . $redirect, true, 303);
    }
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(false, 405, REDIRECT_ERROR, $wantsJson);
}

/** Single-line field: trims, strips control characters (prevents header injection). */
function field(string $name, int $max = 200): string
{
    $value = trim((string)($_POST[$name] ?? ''));
    $value = preg_replace('/[\x00-\x1F\x7F]+/u', ' ', $value) ?? '';
    return mb_substr($value, 0, $max);
}

// Honeypot – real people never fill this in. Pretend success.
if (!empty($_POST['_gotcha'])) {
    respond(true, 200, REDIRECT_OK, $wantsJson);
}

// Time trap
$ts = (int)($_POST['_ts'] ?? 0);
if ($ts > 0 && (time() * 1000 - $ts) < MIN_SECONDS * 1000) {
    respond(true, 200, REDIRECT_OK, $wantsJson);
}

$data = [
    'Vezetéknév / Last name'        => field('last_name', 80),
    'Keresztnév / First name'       => field('first_name', 80),
    'Cégnév / Company'              => field('company', 120),
    'E-mail'                        => field('email', 120),
    'Telefon / Phone'               => field('phone', 30),
    'Felrakodás / Pickup'           => field('pickup_location', 120),
    'Lerakodás / Delivery'          => field('delivery_location', 120),
    'Áru típusa / Cargo type'       => field('cargo_type', 30),
    'Hőmérséklet / Temperature'     => field('temperature', 60),
    'Időpont / Preferred date'      => field('preferred_date', 20),
    'Nyelv / Language'              => field('language', 5),
];
$message = mb_substr(trim((string)($_POST['message'] ?? '')), 0, 4000);
$consent = ($_POST['consent'] ?? '') === 'yes';
$email = $data['E-mail'];

if (
    $data['Vezetéknév / Last name'] === '' ||
    $data['Keresztnév / First name'] === '' ||
    $message === '' ||
    !$consent ||
    !filter_var($email, FILTER_VALIDATE_EMAIL)
) {
    respond(false, 422, REDIRECT_ERROR, $wantsJson);
}

$body = "Új ajánlatkérés érkezett a weboldalról / New quote request from the website\n\n";
foreach ($data as $label => $value) {
    $body .= str_pad($label . ':', 32) . ($value !== '' ? $value : '–') . "\n";
}
$body .= "\nÜzenet / Message:\n" . $message . "\n\n";
$body .= "Adatkezelési hozzájárulás / GDPR consent: igen / yes\n";
$body .= 'Időpont / Sent at: ' . date('Y-m-d H:i:s') . "\n";

$subject = '=?UTF-8?B?' . base64_encode('Új ajánlatkérés – nhcargo.hu') . '?=';
$headers = [
    'From: NH Cargo weboldal <' . MAIL_FROM . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
];

$sent = mail(MAIL_TO, $subject, $body, implode("\r\n", $headers), '-f' . MAIL_FROM);

respond($sent, $sent ? 200 : 500, $sent ? REDIRECT_OK : REDIRECT_ERROR, $wantsJson);
