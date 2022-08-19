###
<h2 align="center">Whatsapp Clone 🥇</h2>


<p align="justify" >
  <a target="_blank" >
      Saya membuat aplikasi Web Whatsapp Clone dengan tujuan pembelajaran yang mana nantinya untuk pengalaman saya dalam membuat sebuah aplikasi menggunakan teknologi firebase dan juga next.js
  </a>
</p>


<p align="justify" >
  <a target="_blank" >
     Whatsapp clone yang dibuat menggunakan Next.js, firebase untuk authentication, penyimpanan data, dibaut pada 2022
  </a>
</p>

<p align="center">
  <a target="_blank">
   <img src="https://m-yogaprasetya.vercel.app/img/whatsapp-clone/whatsapp-clone.png" width="500" height='330'/>                 
  </a>
</p>



<p align="justify" >
  <a target="_blank" >
   Pada aplikasi yang saya buat adalah sebuah cloningan dari whatsapp web versi saya dengan menggunakan next.js sebagai framework dari react.js.
  </a>
</p>


<p align="center">
  <a target="_blank">
   <img src="https://m-yogaprasetya.vercel.app/img/whatsapp-clone/menu_login.png" width="500" height='330'/>                 
  </a>
</p>
<p align="center">
  <a target="_blank">
   <img src="https://m-yogaprasetya.vercel.app/img/whatsapp-clone/google_login.png" width="500" height='330'/>                 
  </a>
</p>



<p align="justify" >
  <a target="_blank" >
   dan selanjutnya pada login menggunakan google yang mana saya menggunakan alur login firebase SDK, dan penyimpanan data pada chating juga menggunakan firestore dari firebase.
  </a>
</p>

```javascript
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGESENDID,
    appId: process.env.NEXT_PUBLIC_APPID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { db, auth, provider };
```

  Pada bagian ini dimana agar terhubungnya aplikasi dengan firebase menggunakan **initializeApp()** dan **getFirestore()** sebagai penyimpanan database dan database tersebut bersifat noSql atau bisa dibilang berupa Json, kemudian untuk Authenticationya saya mengambil sebuat metode dari dokumentasi firebase yaitu **getAuth()** dan new <span>**GoogleAuthProvider().**</span> untuk mendapatkan akses dari Auth Provider Google.

```javascript
useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
        if (!user) {
            console.log("user is null");
            setCurrentUser(null);
            setLoading(false);
            return;
        }
        const token = await user.getIdToken();
        const userData = {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            lastSeen: serverTimestamp(),
        };
        await setDoc(doc(db, "users", user.uid), userData);
        setCurrentUser(user);
        setLoading(false);
    });
}, []);
```


Kemudian ini ketika user sudah melakukan login menggunakan google dan data-data tersebut akan secara otomatis terinput ke database berupa **displayName**, **Email**, **PhotoUrl**, **LastSeen** / kapan terakhir user online. dan kemudian data dari user akan disimpan di CurrentUser yang nantinya akan di fetching di akun tersebut.


<p align="center">
  <a target="_blank" href='https://whatsapp-clone-jagres.vercel.app/'>
  View
  </a>
</p>

