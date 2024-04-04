# ES | Clothes E-commerce

Este proyecto se centra en la creación de un sitio web de comercio electrónico especializado en moda y ropa, ofreciendo una amplia selección de productos de alta calidad. La meta principal de esta iniciativa es proporcionar a los usuarios una plataforma intuitiva y segura para realizar sus compras en línea. El sitio estará equipado con características avanzadas, tales como filtros de búsqueda refinados, autenticación de terceros y una pasarela de pagos segura.

A través de esta plataforma, los clientes podrán explorar diversas categorías de productos, realizar búsquedas específicas, comparar artículos y completar sus compras de manera segura y conveniente. Además, se implementará un sistema de autenticación de terceros para simplificar el proceso de registro y acceso a la plataforma.

En resumen, el propósito fundamental de este proyecto es ofrecer a los amantes de la moda y la ropa una experiencia de compra en línea cómoda, segura y satisfactoria.

## Tecnologías Utilizadas

Lista de las tecnologías más relevantes utilizadas en este proyecto:

<div align="center">  
<a href="https://nextjs.org/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/nextjs.png" alt="NextJS" height="50" /></a>  
<a href="https://www.typescriptlang.org/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/typescript-original.svg" alt="TypeScript" height="50" /></a>  
<a href="https://www.prisma.io/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/prisma.png" alt="Prisma" height="50" /></a>  
<a href="https://www.tailwindcss.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/tailwindcss.svg" alt="Tailwind CSS" height="50" /></a>  
<a href="https://www.postgresql.org/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/postgresql-original-wordmark.svg" alt="PostgreSQL" height="50" /></a>  
<a href="https://github.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/git-scm-icon.svg" alt="Git" height="50" /></a>  
</div>

## Características de la Aplicación

- Autenticación de Terceros: Permite a los usuarios registrarse e iniciar sesión utilizando sus cuentas de terceros, como Google o Facebook.
- Carrito de Compras: Los usuarios pueden agregar productos al carrito de compras, ajustar las cantidades y realizar el proceso de compra.
- Pasarela de Pagos: Integración de una pasarela de pagos para permitir a los usuarios realizar transacciones seguras y completar el proceso de compra.
- Filtros y Ordenamientos: Los usuarios pueden aplicar filtros y ordenamientos para refinar su búsqueda de productos en la tienda.
- Barra de Búsqueda: Los usuarios pueden realizar búsquedas de productos utilizando palabras clave y obtener resultados relevantes.
- Gestión de Productos: Permite a los administradores agregar, editar y eliminar productos en el catálogo de la tienda.
- Gráficos (Dashboard): Ofrece un panel de control con gráficos y estadísticas visuales para proporcionar información sobre el rendimiento de ventas, análisis de productos, etc.

## Instalación 💻

Sigue estos pasos para instalar el proyecto "Clothes" utilizando npm.

Clona el repositorio de GitHub ejecutando el siguiente comando:

```bash
  git clone https://github.com/JuniorHuanca/Clothes.git
```

Navega al directorio del proyecto clonado:

```bash
  cd Clothes
```

Instala las dependencias del proyecto:

```bash
  npm install
```

## Configuración de Variables de Entorno 🛠️

Para ejecutar este proyecto, deberá agregar las siguientes variables de entorno a su archivo .env

<details>
  <summary>
    <b style="font-size: 18px">Autenticación con Google:</b>
  </summary>

- Visita https://console.developers.google.com/apis/credentials en tu navegador y asegúrate de iniciar sesión en tu cuenta de Google.

- Crea un nuevo proyecto o selecciona uno existente.

- Navega a la sección de "Credenciales" o "Credentials" en el panel de control del proyecto.

- Haz clic en "Crear credenciales" o "Create credentials" y selecciona "ID de cliente de OAuth" o "OAuth client ID".

- Completa los campos requeridos para tu cliente de OAuth. Asegúrate de configurar la URL de redireccionamiento adecuada para tu proyecto.

- Después de completar los campos, haz clic en "Crear" o "Create" para crear el cliente de OAuth.

- En la página de configuración del cliente de OAuth, encontrarás las dos variables de entorno necesarias:

  - `GOOGLE_ID`: El ID del cliente de Google.
  - `GOOGLE_SECRET`: El secreto del cliente de Google.

- Copia el valor de cada variable y pégalo en tu entorno de desarrollo o archivo `.env` en el proyecto.

  Ejemplo de archivo `.env`:

  `GOOGLE_ID=YOUR_GOOGLE_ID`

  `GOOGLE_SECRET=YOUR_GOOGLE_SECRET`
  </details>

<details>
  <summary>
    <b style="font-size: 18px">Stripe:</b>
  </summary>

- Visita https://dashboard.stripe.com en tu navegador y accede a tu cuenta de Stripe o crea una cuenta nueva si no tienes una.

- Una vez que hayas accedido, dirígete al panel de control de Stripe.

- En la barra lateral izquierda, haz clic en "Desarrolladores" y luego selecciona "Claves de API".

- En la página de Claves de API, encontrarás dos claves:

  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Esta es la clave de publicación utilizada en el lado del cliente.
  - `STRIPE_SECRET_KEY`: Esta es la clave secreta utilizada en el lado del servidor.

- Copia el valor de cada clave y configúralas como variables de entorno en tu entorno de desarrollo o en un archivo `.env` en el proyecto.

  Ejemplo de archivo `.env`:

  `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=TU_CLAVE_DE_PUBLICACIÓN`

  `STRIPE_SECRET_KEY=TU_CLAVE_SECRETA`
    </details>
<details>
    <summary>
      <b style="font-size: 18px">NEXTAUTH_SECRET:</b>
    </summary>

- Visita https://generate-secret.vercel.app/32 en tu navegador.

- En el sitio web, se generará automáticamente un secreto de 32 caracteres.

- Haz clic en el botón de copiar para copiar el secreto generado.

- Pega el secreto en tu entorno de desarrollo o archivo `.env` en el proyecto.

  Ejemplo de archivo `.env`:

  `NEXTAUTH_SECRET=TU_SECRETO_GENERADO`
    </details>
  <details>
    <summary>
      <b style="font-size: 18px">NodeMailer:</b>
    </summary>
      Para que Nodemailer funcione y pueda enviar correos electrónicos, necesitarás utilizar las credenciales de una cuenta de correo de Google. Sigue los siguientes pasos para obtener las credenciales necesarias:

-Abre un navegador web y visita la página de "Contraseñas de aplicaciones" de Google en https://myaccount.google.com/apppasswords.

- Inicia sesión en tu cuenta de Google si se te solicita.

- En la sección "Seleccionar aplicación" o "Select app", elige la aplicación para la cual deseas generar la contraseña. Si la aplicación no aparece en la lista, selecciona "Otra (personalizada)" o "Other (custom)".

- En la sección "Seleccionar dispositivo" o "Select device", elige el dispositivo desde el cual utilizarás la contraseña de aplicación. Si no aparece el dispositivo deseado, selecciona "Otro (personalizado)" o "Other (custom)".

- Haz clic en el botón "Generar" o "Generate".

- Google generará una contraseña de aplicación única. Copia esta contraseña y guárdala en un lugar seguro.

- Pega la contraseña en tu entorno de desarrollo o archivo `.env` en el proyecto.

  Ejemplo de archivo `.env`:

  `EMAIL_SERVER_USER=TU_GOOGLE_EMAIL`

  `EMAIL_SERVER_PASSWORD=TU_GOOGLE_PASSWORD`
  </details>
  <details>
    <summary>
      <b style="font-size: 18px">Base de Datos ( postgreSQL):</b>
    </summary>
  Agrega la siguiente línea al archivo `.env` para configurar la variable de entorno

Ejemplo de archivo `.env`:
`DATABASE_URL=postgresql://postgres:password@localhost:5432/Clothes?schema=public`

</details>

## Tu archivo debería verse así: 📄

    BASE_URL=http://localhost:3000
    DATABASE_URL=postgresql://postgres:password@localhost:5432/Clothes?schema=public
    EMAIL_FROM=noreply@example.com
    EMAIL_SERVER_HOST=smtp.gmail.com
    EMAIL_SERVER_PASSWORD=example@password
    EMAIL_SERVER_PORT=587
    EMAIL_SERVER_USER=example@example.com
    GOOGLE_ID=TU_GOOGLE_ID
    GOOGLE_SECRET=TU_GOOGLE_SECRET
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=TU_CLAVE_DE_PUBLICACIÓN
    NEXTAUTH_SECRET=TU_SECRETO_GENERADO
    STRIPE_SECRET_KEY=TU_CLAVE_SECRETA

## Ejecutar localmente 🏃‍♀️

Para ejecutar el proyecto localmente, sigue estos pasos:

- Abre una terminal en la raíz del proyecto.
- Luego, ejecuta el siguiente comando para iniciar el servidor de desarrollo:

```bash
  npm run dev
```

- Abre tu navegador web y ve a la URL http://localhost:3000.
  Ahora deberías poder ver y utilizar la aplicación localmente en tu navegador.

## Extra

Los datos utilizados en este proyecto fueron extraídos de: [https://github.com/Klerith/next-teslo/blob/main/database/products.ts](https://github.com/Klerith/next-teslo/blob/main/database/products.ts). Agradecimientos a Fernando Herrera.

# EN | Clothes E-commerce

This project focuses on creating a specialized e-commerce website for fashion and clothing, offering a wide selection of high-quality products. The main goal of this initiative is to provide users with an intuitive and secure platform for their online shopping needs. The website will be equipped with advanced features such as refined search filters, third-party authentication, and a secure payment gateway.

Through this platform, customers will be able to explore various product categories, conduct specific searches, compare items, and complete their purchases securely and conveniently. Additionally, a third-party authentication system will be implemented to simplify the registration and access process to the platform.

In summary, the primary purpose of this project is to offer fashion enthusiasts a comfortable, secure, and satisfying online shopping experience.

## Technologies Used

List of the most relevant technologies used in this project:

<div align="center">  
<a href="https://nextjs.org/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/nextjs.png" alt="NextJS" height="50" /></a>  
<a href="https://www.typescriptlang.org/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/typescript-original.svg" alt="TypeScript" height="50" /></a>  
<a href="https://www.prisma.io/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/prisma.png" alt="Prisma" height="50" /></a>  
<a href="https://www.tailwindcss.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/tailwindcss.svg" alt="Tailwind CSS" height="50" /></a>  
<a href="https://www.postgresql.org/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/postgresql-original-wordmark.svg" alt="PostgreSQL" height="50" /></a>  
<a href="https://github.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/git-scm-icon.svg" alt="Git" height="50" /></a>  
</div>

## Application Features

- Third-Party Authentication: Allows users to register and log in using their third-party accounts, such as Google or Facebook.
- Shopping Cart: Users can add products to the shopping cart, adjust quantities, and proceed through the checkout process.
- Payment Gateway: Integration of a payment gateway to enable users to make secure transactions and complete the purchasing process.
- Filters and Sorting: Users can apply filters and sorting options to refine their product search within the store.
- Search Bar: Users can search for products using keywords and receive relevant results.
- Product Management: Enables administrators to add, edit, and delete products in the store catalog.
- Dashboard: Provides a control panel with graphs and visual statistics to offer insights into sales performance, product analysis, etc.

## Installation 🛠️

Follow these steps to install the "Clothes" project using npm.

Clone the GitHub repository by executing the following command:

```bash
git clone https://github.com/JuniorHuanca/Clothes.git
```

Navigate to the cloned project directory:

```bash
  cd Clothes
```

Install the project dependencies:

```bash
  npm install
```

## Environment Variables Configuration 📄

To run this project, you will need to add the following environment variables to your .env file:

<details>
  <summary>
    <b style="font-size: 18px">Google Authentication:</b>
  </summary>

- Visit https://console.developers.google.com/apis/credentials in your browser and make sure you are logged in to your Google account.

- Create a new project or select an existing one.

- Navigate to the "Credentials" section in the project's dashboard.

- Click on "Create credentials" and select "OAuth client ID".

- Fill in the required fields for your OAuth client. Make sure to set the appropriate redirect URL for your project.

- After filling in the fields, click on "Create" to create the OAuth client.

- On the OAuth client settings page, you will find the two required environment variables:

  `GOOGLE_ID`: The Google client ID.
  `GOOGLE_SECRET`: The Google client secret.

- Copy the value of each variable and paste it into your development environment or `.env` file in the project.

  Example `.env` file:

  `GOOGLE_ID=YOUR_GOOGLE_ID`

  `GOOGLE_SECRET=YOUR_GOOGLE_SECRET`
  </details>

<details>
  <summary>
    <b style="font-size: 18px">Stripe:</b>
  </summary>

- Visit https://dashboard.stripe.com in your browser and log in to your Stripe account or create a new account if you don't have one.

- Once you have logged in, navigate to the Stripe dashboard.

- In the left sidebar, click on "Developers" and then select "API Keys".

- On the API Keys page, you will find two keys:

  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: This is the publishable key used on the client-side.
  - `STRIPE_SECRET_KEY`: This is the secret key used on the server-side.

- Copy the value of each key and set them as environment variables in your development environment or in a `.env` file in your project.

  Example `.env` file:

  `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY`

  `STRIPE_SECRET_KEY=YOUR_SECRET_KEY`
  </details>

<details>
  <summary>
    <b style="font-size: 18px">NEXTAUTH_SECRET:</b>
  </summary>

- Visit https://generate-secret.vercel.app/32 in your browser.

- On the website, a 32-character secret will be automatically generated.

- Click on the copy button to copy the generated secret.

- Paste the secret into your development environment or `.env` file in your project.

  Example `.env` file:

  `NEXTAUTH_SECRET=YOUR_GENERATED_SECRET`
  </details>
  <details>
    <summary>
      <b style="font-size: 18px">NodeMailer:</b>
    </summary>

In order for Nodemailer to work and send emails, you will need to use the credentials from a Google email account. Follow these steps to obtain the necessary credentials:

- Open a web browser and visit the "App passwords" page of Google at https://myaccount.google.com/apppasswords.

- Sign in to your Google account if prompted.

- In the "Select app" section, choose the application for which you want to generate the app password. If the application doesn't appear in the list, select "Other (custom)".

- In the "Select device" section, choose the device from which you will use the app password. If the desired device doesn't appear, select "Other (custom)".

- Click the "Generate" button.

- Google will generate a unique app password. Copy this password and keep it in a secure place.

- Paste the password into your development environment or `.env` file in your project.

  Example `.env` file:

  `EMAIL_SERVER_USER=YOUR_GOOGLE_EMAIL`

  `EMAIL_SERVER_PASSWORD=YOUR_GOOGLE_PASSWORD`
  </details>
  <details>
    <summary>
      <b style="font-size: 18px">Database (PostgreSQL):</b>
    </summary>

Add the following line to the `.env` file to configure the environment variable.

Example `.env` file:
`DATABASE_URL=postgresql://postgres:password@localhost:5432/Clothes?schema=public`

</details>

## Your file should look like this: 🏃‍♀️

    BASE_URL="http://localhost:3000/"
    DATABASE_URL=postgresql://postgres:password@localhost:5432/Clothes?schema=public
    EMAIL_FROM=noreply@example.com
    EMAIL_SERVER_HOST=smtp.gmail.com
    EMAIL_SERVER_PASSWORD=example@password
    EMAIL_SERVER_PORT=587
    EMAIL_SERVER_USER=example@example.com
    GOOGLE_ID=YOUR_GOOGLE_ID
    GOOGLE_SECRET=YOUR_GOOGLE_SECRET
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
    NEXTAUTH_SECRET=YOUR_GENERATED_SECRET
    STRIPE_SECRET_KEY=YOUR_SECRET_KEY

## Run Locally 📝

To run the project locally, follow these steps:

- Open a terminal in the project's root directory.
- Then, run the following command to start the development server:

```bash
npm run dev
```

- Open your web browser and go to the URL http://localhost:3000.
  You should now be able to view and use the application locally in your browser.

## Extra

The data used in this project was extracted from: [https://github.com/Klerith/next-teslo/blob/main/database/products.ts](https://github.com/Klerith/next-teslo/blob/main/database/products.ts). Thanks to Fernando Herrera.

## Demo

https://clothesjh.vercel.app

## Author

- [@Junior Huanca](https://github.com/JuniorHuanca)

<br />

## Connect with me

<div align="center">
<a href="https://github.com/JuniorHuanca" target="_blank">
<img src=https://img.shields.io/badge/github-%2324292e.svg?&style=for-the-badge&logo=github&logoColor=white alt=github style="margin-bottom: 5px;" />
</a>
<a href="https://www.linkedin.com/in/juniorhuanca/" target="_blank">
<img src=https://img.shields.io/badge/linkedin-%231E77B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white alt=linkedin style="margin-bottom: 5px;" />
</a>  
</div>

<br />
