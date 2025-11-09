## 🌐 Language / Dil

🇹🇷 [Türkçe](#-t%C3%BCrk%C3%A7e)<br>
🇺🇸 [English](#-english)

## 🇹🇷 Türkçe
## Açıklama
**Bu proje, yapay zekâ destekli bir geliştirme stratejisiyle hazırlanmıştır. Teknolojik altyapı, uygulama mimarisi ve proje gereksinimlerine yönelik tüm analiz ve teknik planlama tarafımdan gerçekleştirilmiştir. Kod üretim aşamasında ChatGPT ve Cursor gibi yapay zekâ araçları etkin biçimde yönlendirilmiş, geliştirme süreci bu araçlar üzerinden yürütülmüştür. Amaç, yapay zekâ destekli üretim ile hızlı, kontrollü ve yüksek kaliteli bir yazılım çıktısı elde etmektir.**

## Proje Adı
Deal Submission (YAY Network)

## Kısa Tanım
YAY Network’ün değerlendirdiği projeler için topluluk ön satış (presale) başvurularını toplayan, proje bilgisini Google Sheets’ten okuyan ve başvuruları yine aynı dokümana yazan hafif bir web uygulaması.

## Ne İşe Yarar?
İlgili projenin adı ve görünürlük durumu Google Sheets’teki **Deals** sayfasından çekilir:
- A sütunu: Proje adı
- B sütunu: Görünürlük bayrağı (true / 1 / yes aktif kabul edilir)
- Uygulama ilk satırı başlık olarak kabul eder. Başlık satırından sonra, isActive değeri true/1/yes olan ilk satır aktif deal olarak seçilir ve bu satırdaki proje adı kullanıcıya gösterilir. Eğer hiçbir satır aktif değilse “Could not fetch deal data. Please try again later.” uyarısı verilir.
- Kullanıcı başvuru formunu doldurur: Telegram username, Email address, Wallet address, Desired allocation.
- Gönderimler Google Sheets’teki Submissions sayfasına satır olarak eklenir.
- Aynı deal adı için aynı wallet address ile ikinci kez başvuru yapılırsa:
“You have already submitted for this deal.” hatası gösterilir.

## Kullanıcı Akışı
- Kullanıcı sayfayı açar → Uygulama Deals!A:B aralığını okur.
- İlk satır başlıktır; sonrasında isActive = true/1/yes olan satır varsa proje adı ekrana yansır.
- Eğer aktif satır yoksa “Could not fetch deal data. Please try again later.” gösterilir.
- Kullanıcı formu doldurup gönderir: Telegram, Email, Wallet, Allocation
- Uygulama, Submissions sayfasında aynı DealName + WalletAddress kombinasyonu var mı kontrol eder.
- Varsa: “You have already submitted for this deal.” (yeni satır eklenmez)
- Yoksa: timestamp + form verileri yeni satır olarak eklenir
- Başarılı gönderimden sonra kullanıcıya onay mesajı gösterilir.

## Ekran Görüntüleri
### Kullanıcı Form Sayfası
- Aktif proje var.
<img id="main1tur" src="public/main1.jpg" width="450" />
<br>

- Aktif proje varken kullanıcı bilgilerini giriyor.
<img id="main3tur" src="public/main3.jpg" width="450" />
<br>

- Kullanıcı bilgilerini gönderiyor ve "Application submitted successfully!" dönüyor.
<img src="public/main4.jpg" width="450" />
<br>

- Kullanıcı aynı cüzdan adresiyle yeni bir kayıt göndermeye çalışıyor. Mükerrer kaydı önlemek adına giriş kabul edilmiyor ve "You have already submitted for this deal." dönüyor.
<img src="public/main5.jpg" width="450" />
<br>

- Aktif proje yok.
<img id="main2tur" src="public/main2.jpg" width="450" />
<br>

### Google Sheets
- İlgili dokümanın "Deals" sayfasının A2 hücresinde projenin adı, ve B2 hücresinde projenin aktif olduğu görülüyor. Bu haliyle kullanıcı form sayfasına "EXAMPLE DEAL" olarak dönüyor.
<img src="public/sheets1.jpg" width="450" />

[burada](#main1tur)
<br>

- İlgili dokümanın "Deals" sayfasının A2 hücresinde projenin adı, ve B2 hücresinde projenin aktif olmadığı görülüyor. Bu haliyle kullanıcı form sayfasında  "Could not fetch deal data. Please try again later." uyarısı dönüyor.
<img src="public/sheets2.jpg" width="450" />

[burada](#main2tur)
<br>

- Kullanıcı bilgilerini form aracılığıyla gönderiyor ve kullanıcının bilgileri ilgili dokümanın "Submissions" sayfasında yeni satırda kaydediliyor.
<img src="public/sheets3.jpg" width="450" />

[burada](#main3tur)
<br>

## Özellikler
- Dinamik Proje Bilgisi: Proje adı ve aktiflik durumu doğrudan Google Sheets’ten yönetilir.
- Tekil Başvuru Doğrulaması: Aynı deal için aynı cüzdanla mükerrer başvuru engellenir.
- Basit Form: Telegram / Email / Wallet / Allocation alanlarıyla minimal veri toplama.
- Google Sheets’e Yazma: Submissions sayfasına satır bazlı ekleme, operasyon ekibine raporlama kolaylığı.

## Durum Mesajları:
- Aktif satır yok → Could not fetch deal data. Please try again later.
- Mükerrer gönderim → You have already submitted for this deal.

## Teknoloji Yığını
- Framework: Proje, Next.js (15.3.4) ve React (18.2.0) üzerine kurulu. Kod tabanı JavaScript kullanıyor.
- Sunucu tarafı (API Routes):
- pages/api/deal.js: Deals sayfasını okur, başlık satırından sonra isActive = true/1/yes olan ilk satırı bularak proje adını döndürür.
- pages/api/submit.js: Submissions sayfasına yeni başvuru ekler. Aynı DealName + WalletAddress kombinasyonu daha önce varsa hata döndürür, yoksa yeni satır ekler.

## Google Sheets entegrasyonu
- googleapis kütüphanesi kullanılır.
- Okuma: spreadsheets.values.get
- Yazma: spreadsheets.values.append
- lib/sheets.js: Google Service Account bilgileriyle Sheet istemcisi oluşturur (global cache).

## Environment değişkenleri:
- GOOGLE_SA_EMAIL: Service Account e-posta adresi
- GOOGLE_SA_KEY: Service Account private key (\n formatlı)
- SHEET_ID: Kullanılan Google Sheet dokümanının kimliği
  ##
**Stil:** Temel stiller apply.css üzerinden sağlanır. <br>
**Dağıtım:** Vercel üzerinde çalıştırılmaya uygundur.

## Kurulum (Local Development)
- Proje Node.js üzerinde çalışır. Next.js 15 kullanıldığı için Node.js 18 veya üzeri önerilir.
- Projeyi bilgisayarınıza alın (klon veya ZIP).
- Proje kök dizininde .env.local oluşturun ve örnek formatı ekleyin:
```bash
SHEET_ID=bu_kısma_Google_Sheet_ID_gelir
GOOGLE_SA_EMAIL=servis_hesabi_email_adresi@project.iam.gserviceaccount.com
GOOGLE_SA_KEY="-----BEGIN PRIVATE KEY-----\nburaya_özel_key_gelir\n-----END PRIVATE KEY-----\n"
```
- Terminalde:
```bash
npm install
npm run dev
```
- Uygulama varsayılan olarak http://localhost:3000 adresinde çalışır.
- Tarayıcıda /api/deal adresine giderek aktif deal kontrol edilebilir.
- Form gönderimleri Submissions sayfasına eklenir.
- .env.local .gitignore içindedir; commit edilmez.

## Vercel Üzerinde Deploy ve Environment Değişkenleri
- Uygulama, Next.js tabanlı olduğu için Vercel’e doğrudan deploy edilebilir.
- “New Project” → GitHub reposu seçilir.
- Environment variables eklenir:
```env
SHEET_ID
GOOGLE_SA_EMAIL
GOOGLE_SA_KEY
```
- Deploy tamamlandığında size bir domain verilir.
- /api/deal üzerinden test edilebilir.
- -Form gönderimleri canlı ortamda da doğrudan Submissions sayfasına düşer.
- Eğer environment değişkenleri eklenmezse /api/deal ve /api/submit hata döndürür.
- GOOGLE_SA_KEY değeri burada da \n satır sonlarıyla tek satır olarak girilmelidir.
- Vercel ortamında .env.local yerine Environment Variables kullanılır.

<br>

## 🇺🇸 English
## Description
**This project was developed using an AI-assisted strategy. All technical planning, analysis, application architecture, and project requirements were carried out by me. During the coding phase, AI tools such as ChatGPT and Cursor were actively guided, and the development process was executed through these tools. The goal is to achieve a fast, controlled, and high-quality software output using AI-assisted development.**

## Project Name
Deal Submission (YAY Network)

## Short Definition
A lightweight web application that collects community presale submissions for projects evaluated by YAY Network, reads project information from Google Sheets, and writes submissions into the same document.

## What Does It Do?
The relevant project name and visibility status are fetched from the **Deals** sheet in Google Sheets:
- Column A: Project name
- Column B: Visibility flag (true / 1 / yes are considered active)
- The first row is treated as the header. After the header row, the first row where isActive is true/1/yes is selected as the active deal, and the project name is displayed to the user. If no active row exists, the message “Could not fetch deal data. Please try again later.” is shown.
- The user completes the submission form: Telegram username, Email address, Wallet address, Desired allocation.
- Submissions are added row by row to the **Submissions** sheet.
- If a second submission is made with the same wallet address for the same deal:
“You have already submitted for this deal.” error is shown.

## User Flow
- User opens the page → The application reads the Deals!A:B range.
- The first row is a header; after that, if there is a row where isActive = true/1/yes, the project name is displayed.
- If there is no active row, “Could not fetch deal data. Please try again later.” is displayed.
- User fills and submits the form: Telegram, Email, Wallet, Allocation
- The application checks the Submissions sheet for the same DealName + WalletAddress combination.
- If exists: “You have already submitted for this deal.” (no new row added)
- If not: a new row with timestamp + form data is added
- After a successful submission, a confirmation message is shown to the user.

## Screenshots
### User Form Page
- There is an active project.
<img id="main1eng" src="public/main1.jpg" width="450" />
<br>

- The user enters their information while there is an active project.
<img id="main3eng" src="public/main3.jpg" width="450" />
<br>

- The user submits their information and it returns “Application submitted successfully!”.
<img src="public/main4.jpg" width="450" />
<br>

- The user tries to submit a new application with the same wallet address. To prevent duplicate submissions, the entry is not accepted and it returns “You have already submitted for this deal.”
<img src="public/main5.jpg" width="450" />
<br>

- There is no active project.
<img id="main2eng" src="public/main2.jpg" width="450" />
<br>

### Google Sheets
- In the “Deals” sheet of the document, the project’s name is shown in cell A2 and its active status is shown in cell B2. In this case, it is returned to the user’s form page as “EXAMPLE DEAL.”
<img src="public/sheets1.jpg" width="450" />

[here](#main1eng)
<br>

- In the “Deals” sheet of the document, the project’s name is shown in cell A2 and its status in cell B2 indicates that it is not active. In this case, the user’s form page returns the warning “Could not fetch deal data. Please try again later.”
<img src="public/sheets2.jpg" width="450" />

[here](#main2eng)
<br>

- The user submits their information through the form, and the user’s details are saved in a new row in the “Submissions” sheet of the document.
<img src="public/sheets3.jpg" width="450" />

[here](#main3eng)
<br>

## Features
- Dynamic Project Data: Project name and status are managed directly through Google Sheets.
- Unique Submission Check: Prevents duplicate submissions from the same wallet for the same deal.
- Simple Form: Minimal data collection with Telegram / Email / Wallet / Allocation.
- Google Sheets Write: Adds submissions as rows to the Submissions sheet, making it easy for the operations team to report.

## Status Messages:
- No active row → Could not fetch deal data. Please try again later.
- Duplicate submission → You have already submitted for this deal.

## Tech Stack
- Framework: Built on Next.js (15.3.4) and React (18.2.0). Codebase uses JavaScript.
- Server-side (API Routes):
- pages/api/deal.js: Reads the Deals sheet, finds the first row after the header where isActive = true/1/yes, and returns the project name.
- pages/api/submit.js: Adds a new submission to the Submissions sheet. If the same DealName + WalletAddress exists, returns an error; otherwise, appends a new row.

## Google Sheets Integration
- Uses the **googleapis** library.
- Read: spreadsheets.values.get
- Write: spreadsheets.values.append
- lib/sheets.js: Creates the sheet client using Google Service Account credentials (global cache).

## Environment Variables:
- GOOGLE_SA_EMAIL: Service Account email address
- GOOGLE_SA_KEY: Service Account private key (\n formatted)
- SHEET_ID: ID of the Google Sheet document
  ##
**Style:** Basic styles are provided via apply.css. <br>
**Deployment:** Suitable for deployment on Vercel.

## Setup (Local Development)
- The project runs on Node.js. Since Next.js 15 is used, Node.js 18 or above is recommended.
- Clone or download the project.
- Create a `.env.local` file in the project root and add the following format:
```bash
SHEET_ID=Google_Sheet_ID_here
GOOGLE_SA_EMAIL=service_account_email@project.iam.gserviceaccount.com
GOOGLE_SA_KEY="-----BEGIN PRIVATE KEY-----\nprivate_key_goes_here\n-----END PRIVATE KEY-----\n"
```
- In Terminal:
```bash
npm install
npm run dev
```
- The app runs by default at http://localhost:3000
- Visit /api/deal in the browser to check the active deal.
- Form submissions are recorded in the Submissions sheet.
- .env.local is in .gitignore and should not be committed.

## Deploying on Vercel & Environment Variables
- Since the app is built with Next.js, it can be deployed directly to Vercel.
- “New Project” → Select the GitHub repository.
- Add environment variables:
```env
SHEET_ID
GOOGLE_SA_EMAIL
GOOGLE_SA_KEY
```
- After deployment, Vercel provides a domain.
- /api/deal can be tested there.
- Form submissions will also flow directly into the Submissions sheet in production.
- If environment variables are missing, /api/deal and /api/submit will fail.
- GOOGLE_SA_KEY must contain \n line breaks in a single string.
- On Vercel, Environment Variables are used instead of .env.local.
