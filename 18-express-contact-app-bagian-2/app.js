const express = require('express');
const app = express();
const port = 3000;
const { loadContact, findContact, addContact } = require('./utils/contacts');
const expressLayouts = require('express-ejs-layouts');
const { body, check, validationResult } = require('express-validator');

app.set('view engine', 'ejs'); // Templating engine EJS
app.use(expressLayouts); // Third-party middleware
app.use(express.static('public')); // Built-in middleware
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    const pegawai = [
        {
            nama: "Ajun Bagas",
            email: "ajunbagas@gmail.com"
        },
        {
            nama: "Sarah Apriliani",
            email: "sarahapr@gmail.com"
        },
        {
            nama: "Gustav Kennedy",
            email: "gustavken@gmail.com"
        }
    ];

    res.render('index', {
        layout: 'layouts/main-layout',
        title: "Homepage",
        email: "ujangs@yandex.com",
        pegawai: pegawai
    });
}); 

app.get('/about', (req, res) => {
    res.render('about', {
        layout: 'layouts/main-layout',
        title: 'About page',
    });
})

app.get('/contact', (req, res) => {
    const contacts = loadContact();

    res.render('contact', {
        layout: 'layouts/main-layout',
        title: "Contact page",
        contacts: contacts,
    });
})

// Halaman form add data contact
app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
        layout: 'layouts/main-layout',
        title: "Form tambah data contact",
    });
});

// Proses store data contact
app.post('/contact', 
    [
        check('email', 'Alamat email tidak valid').isEmail(),
        check('telp', 'Nomor telepon tidak sesuai dengan format baku').isMobilePhone('id-ID'),
    ],
    (req, res) => {
        const errors = validationResult(req);

        if ( !errors.isEmpty() ) {
            return res.status(400).json({ errors: errors.array() });
        }

        // addContact(req.body);
        // res.redirect('/contact');
}); 

// Halaman detail contact
app.get('/contact/:nama', (req, res) => {
    const contact = findContact(req.params.nama);

    res.render('detail', {
        layout: 'layouts/main-layout',
        error: "Contact dengan nama tersebut tidak tersedia!",
        title: "Detail contact",
        contact: contact,
    });
})

app.use('/', (req, res) => {
    res.status(404);
    res.send('<h1 align="center">404 Page not found</h1>');
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});