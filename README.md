# GALLERY

<table>
<tr>
<td><img width="720" alt="game_archive_register" src="https://github.com/user-attachments/assets/f286fecb-b0cf-47ea-980e-7a7064056c0d" /></td>
<td><img width="720" alt="game_archive_login" src="https://github.com/user-attachments/assets/3846743f-5e9f-4a30-a001-e81c2e46b6f3" /></td>
</tr>

<tr>
<td><img width="720" alt="game_archive_profile" src="https://github.com/user-attachments/assets/ad78cca9-c36c-4bf5-9a38-e1bf8b225d87" /></td>
<td><img width="720" alt="game_archive_welcome" src="https://github.com/user-attachments/assets/5aafbe11-8f98-44c4-a7be-cd2494de28ca" /></td>
</tr>

<tr>
<td><img width="720" alt="game_archive" src="https://github.com/user-attachments/assets/b2235dd2-0b57-4326-b5ad-e6bc5ccae453" /></td>
<td><img width="720" alt="game_archive_tron" src="https://github.com/user-attachments/assets/4d332904-b26d-450a-80ea-ef739e0cdb66" /></td>
</tr>

<tr>
<td><img width="720" alt="game_archive_rules" src="https://github.com/user-attachments/assets/9f8ae7a3-e71f-4a46-a401-1d50724df253" /></td>
<td><img width="720" alt="game_archive_scoreboard" src="https://github.com/user-attachments/assets/c5f5d6c4-e260-444f-8e10-8087df6c2758" /></td>
</tr>
</table>

# GIFS

<p align="center">
  <img width="720" alt="game_archive_games" src="https://github.com/user-attachments/assets/e8b4bd8b-62f3-484e-816a-b9db3059a948" />
</p>

<p align="center">
  <img width="720" alt="game_archive_faq" src="https://github.com/user-attachments/assets/e91d86f4-8986-439c-9264-a434657e3c2a" />
</p>



<br>
<br>
<br>


Game Archive Project

## 🛠️ Installation & Setup Guide

To run this project locally, you need to set up both the **Angular Frontend** and the **Laravel Backend**.

### Prerequisites
Make sure you have the following installed:
* Node.js & NPM
* PHP & Composer
* A database (MySQL)


___

<br>

Open XAMPP, start Apache and MySQL


<img width="442" height="113" alt="image" src="https://github.com/user-attachments/assets/42413f5f-e7aa-49fd-a11b-565117b5a2b5" />

<br>
<br>

## Clone repo
In VSCode, open an empty folder and then open a terminal.

<img width="330" height="77" alt="image" src="https://github.com/user-attachments/assets/a4a5488e-bcab-484c-ba27-0434beb820a2" />  

<br>
<br>

Clone the repository  
```
git clone https://github.com/aggrxssor/game-archive
```

<img width="687" height="139" alt="image" src="https://github.com/user-attachments/assets/dc442cfd-f91c-49e3-baa6-275d94076305" />

<br>
<br>

## BACKEND


Navigate to the backend folder and run
```
composer install
```


<img width="332" height="79" alt="image" src="https://github.com/user-attachments/assets/2a81fefb-c9da-448c-8332-147ad6bccfbd" />

<br>
<br>

You can then migrate


```
php artisan migrate
```

<br>
<br>

Create game_archive


> The database 'game_archive' does not exist on the 'mysql' connection. Would you like to create it? (yes/no)


>>yes


<img width="652" height="112" alt="image" src="https://github.com/user-attachments/assets/8bdb5c1d-291c-4c9d-aa35-aeb3851b7824" />

<br>
<br>

When it's done, serve
```
php artisan serve
```

# FRONTEND

Create a new terminal and navigate to game-archive

Run npm install, then ng serve
```
npm install
```
```
ng serve
```
<img width="507" height="230" alt="image" src="https://github.com/user-attachments/assets/43bfa2b9-e7b0-4755-bd6a-26efad27d56b" />


The website is now available at http://localhost:4200/. Have fun!
