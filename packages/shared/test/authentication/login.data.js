export const Modulus = `
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

S02yU4ENpYwmYK2fZlNRMHEpnpo4z3r7dbpfsW6tV9InIFXXk53k7gpC40WgyiHtF7EMUQ2hRmKLCpPhK27qkIGHpRBoVzKj9NbjZ2b+f79otH7cLVwpsioJwMmP12lK8uKB4RTS9tQiLPczs4F6fshGfhDcTb45ygIZ+KCX4j0znDEpf/R0FQeBto1Vy/mPnu21NuWZcDVukQkZKYsefylixszYRtBfynESmStzu9wmm75fH74JptuAbkq6KZtosYdLRk96yIcIXr6T9XazDZz47VWrS3fQACGY/wKmW1n7z3rkkEKCRplWzSJOIOS6fH35f1p/G72j8ZHu9M8Z3w==
-----BEGIN PGP SIGNATURE-----
Version: ProtonMail
Comment: https://protonmail.com

wl4EARYIABAFAlwB1j4JEDUFhcTpUY8mAABIbgD9HllIcS6Mc2Vy8SVODWwY
2dw231bE2o+k6ypYxjQdr5oBAIRQKlN6e7mTWa9DayR2ix3wS0NinK+BO+h3
EL8XnJcB
=NaAE
-----END PGP SIGNATURE-----
`;

export const ServerEphemeral =
    '4yh6FbkEaiHVq7/sAQqa7sE1zfkyyKShGzRWneNCqsqtGwGoehV4lTWmAmLXiCoLE4Q4RDa2tWHnUy+CTJbV7rBgvCe4oRC+0Rf8v3BZCDTakAdqMQgX8A1Xjuvbokl4pVnO6Yry5WM6Iko6HIFD91JAWBWd+FKAhe0CjJFrwEzmoumJSBns/WQju2e0RFnwP3i9p5APGlBzB2fpLqLEkgVGJ2fkdzJcdbw82CCryfa5tszkkQSoQAIdIDq60+PKZJEXXMu28lBL5YRgPBuc3joq+Ic1obn2IWLA8fUcFkIeIVZDdD2P/WduZq4M08Wf1SadROM4Rz0VLDoGOD8slQ==';
export const Salt = 'fHu36wAR86rBDo/1bEiW7w==';
export const ServerProof =
    'BeUSaRql+ab+1hNYGoeZUy8yoK0i3ad3zO4tUjCDsMmARBYyM1yO2fM2J+6UFBlVLSLmqYHgg5A8RJcCEOvCa4i6unG41lYaIxEqmvZIG8tf7zGdOpN8Bj2XwrWpVIHtEjXV0gY6YnbjuAzj0BaV31O54bxhp0ZTB/sgyt/iHtivf7BvMPZM//8UDa2y+PsugqpAEMFzRYXSPH3S4dpV2VKXKT0NdG2wRSL5CzI/dlXpFEuO/aX+rQmGxdGp1sNnXqJRyPFrbLwkaNURQQc8V7pY+g21SdIPB0QrehPalwccs6nTHwqTz60PO+Dr6ENqWZDF0s3YHr0CC96/8CJECw==';

export const INFO_RESPONSE = {
    Salt,
    ServerEphemeral,
    Modulus,
    Version: 4,
    '2FA': {
        TOTP: 1,
        U2F: null
    }
};

export const INFO_RESPONSE_NO_2FA = {
    Salt,
    ServerEphemeral,
    Modulus,
    Version: 4,
    '2FA': {
        TOTP: 0,
        U2F: null
    }
};

const PrivateKey =
    '-----BEGIN PGP PRIVATE KEY BLOCK-----\nVersion: ProtonMail\nComment: https://protonmail.com\n\n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\nqxNXJd5vAkDBhT7GE3SynVm5htlqqP971VI=\n=1a6B\n-----END PGP PRIVATE KEY BLOCK-----\n';
const PrivateKeyUnlock =
    '-----BEGIN PGP PRIVATE KEY BLOCK-----\nVersion: ProtonMail\nComment: https://protonmail.com\n\n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\nGH6PtWY=\n=bc9T\n-----END PGP PRIVATE KEY BLOCK-----\n';

export const AUTH_RESPONSE_NO_UNLOCK = {
    AccessToken:
        '-----BEGIN PGP MESSAGE-----\nVersion: ProtonMail\nComment: https://protonmail.com\n\nwcBMA51hbeAaVlxHAQf/Qj7Hs+1apJsX/XXkcnOl62sCFOI15yR6HiIxeuyB\n5bil2G0sTepsj9ilk3r9rt2tshZDbFDFmIrp4ikJ7qs54eySALLGWd6hV2GN\n9ZiTucSWomBA6iHUk5RjTXIqU/AilnLgZhxr0YHZUXmqb7VnFUgqpXa3e8Bg\nNeBllmOzueYX3qCWBkrX98vKjh7HkaB7jMB/up1ej6DmvKRH7c38GqjHpu9U\nnLBHzJkP8mTOdwMVFTuwHmTB0zv/czLa5ouCsYaUvtPoaBbnFcxVSpJgTEj9\nR6EultpJmHdyGKjltiHJfKebWuZZYXFBGGg2ZGgRa/iwDAhqhci2RQ+Qis07\nINJgAZMc26Bw14uBLk8z3aUE7WJp8qj0pnldtkCW+v2D+7SU35Wkqp7SWEDB\nYrihq+GBLUmBaa/zRx2kvCBreIzzQXfBPPPIqS/YcoIsa7sqera1XTEJJRhc\nZOSaWhCorMhY\n=Rpgx\n-----END PGP MESSAGE-----\n',
    UID: '95c0ea8d92f759c13c2a17d3921daa75e761ce92',
    PasswordMode: 1,
    '2FA': {
        TOTP: 1,
        U2F: null
    },
    PrivateKey,
    KeySalt: Salt,
    ServerProof
};

export const AUTH_RESPONSE = {
    AccessToken:
        '-----BEGIN PGP MESSAGE-----\nVersion: ProtonMail\nComment: https://protonmail.com\n\nwcBMA7cnl/90zomAAQgAsaZrXlDG5gIPtsUiW4uu/dUz61tCub+1OzVfKHxP\nZOtwuLUynI1VqfXneE3HzRxWSCqZyHZSxemPuk09F3P6/H03yPPV9FffDKr7\nyQADaA5EAVNMj2iab2ZrPZupz3dfnbWZzdwtNX5ruKuxArIrR2vjrK6QyZQh\n+UWAl1IwJMbRjRx+9Tj0f+I+QhXbDIgYp0KuKOBnJT/p3vqBCcjuMcD24tIC\n8+PQNRr8z0x20pv6l9Q7zJP24b24gYWNbx0lmOIJwmoqhvED+Z2zx2gP0wmB\neyEV1cCA7Kz33Cg1dN9aXTyp7IJJNDT7xScD0IVL8au58+3eMhJmefIyPMqV\neNJgAZEfZ4MbQ+5F3Gq1+DjRUI/DqEpq99roHIcGGSeEQcG9pSZ3oY3MnP54\nn7zyIOrgFDgh/JD9qWGW0l+dau0tF59HSxjGLkEyQu537jc5GJYFCrapZOvM\nPpv89mFWjXkM\n=Jxxl\n-----END PGP MESSAGE-----\n',

    UID: '95c0ea8d92f759c13c2a17d3921daa75e761ce92',
    PasswordMode: 2,
    '2FA': {
        TOTP: 1,
        U2F: null
    },
    PrivateKey: PrivateKeyUnlock,
    KeySalt: 'CmCqJDEjv0c5yGNMfUVcZw==',
    ServerProof
};

export const AUTH_RESPONSE_CLEARTEXT = {
    AccessToken: '123',
    UID: '95c0ea8d92f759c13c2a17d3921daa75e761ce92',
    PasswordMode: 2,
    '2FA': {
        TOTP: 1,
        U2F: null
    },
    ServerProof
};

export const COOKIE_RESPONSE = {};

export const USER_RESPONSE = {
    User: {
        Keys: [
            {
                ID: '6T3seNEkkEFpQIiSQw5SUNrzoeUDOzbcf9_Hm6g1CRnzSsXBfU2kIM8DlAq8ffl5l-go8VM5fBjhglJlRsqqeQ==',
                Primary: 1,
                PrivateKey:
                    '-----BEGIN PGP PRIVATE KEY BLOCK-----\nVersion: ProtonMail\nComment: https://protonmail.com\n\n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\n=aLGy\n-----END PGP PRIVATE KEY BLOCK-----\n'
            },
            {
                ID: 'ZtxF90vTPmN7sZO1G7wHoVcJWRu1BLFS_J2sYKpw-2xew8Ld0qIS0TjddC83v5QQWuUYmpk73R3pEQA4mEoSDA==',
                Primary: 0,
                PrivateKey:
                    '-----BEGIN PGP PRIVATE KEY BLOCK-----\nVersion: ProtonMail\nComment: https://protonmail.com\n\n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\n/P72/yFGChFiW0zc2F1SvaQYRToNLKFZVGYSGw==\n=CBJG\n-----END PGP PRIVATE KEY BLOCK-----\n'
            }
        ]
    }
};

export const USER_RESPONSE_NO_KEYS = {
    User: {
        Keys: []
    }
};

export const SALT_RESPONSE = {
    KeySalts: [
        {
            ID: '6T3seNEkkEFpQIiSQw5SUNrzoeUDOzbcf9_Hm6g1CRnzSsXBfU2kIM8DlAq8ffl5l-go8VM5fBjhglJlRsqqeQ==',
            KeySalt: 'P1ep8VKlNMgMblolFu+F7Q=='
        },
        {
            ID: 'ZtxF90vTPmN7sZO1G7wHoVcJWRu1BLFS_J2sYKpw-2xew8Ld0qIS0TjddC83v5QQWuUYmpk73R3pEQA4mEoSDA==',
            KeySalt: 'MDRDvBUu1bKtKyG3/v5BXw=='
        },
        {
            ID: 'cLKeYpv7gDHugAfXyRKZtw3mO2p2-wh7gK0LzMZ3YEuuyCUkyXAiFwzqafHyTdfRmkomgeAfL3AIxnSlizUxnQ==',
            KeySalt: 'MDRDvBUu1bKtKyG3/v5BXw=='
        },
        {
            ID: '8AoGzP-L1ZDAG-k2L96iHi6wZaA1voC8O8mL5dDigjWDaXyL0vn8xlLxnArS6b3WiAUDKNrV_ggV97fxUiPS3g==',
            KeySalt: 'MDRDvBUu1bKtKyG3/v5BXw=='
        },
        {
            ID: 'LZf3JB-AHweqjyMgBDvKnLC7FoZcO0Qlz5-eMLlEuiA6epFioyddjNaEHLPAh39SyAcdeGDuUraxvBpSWHFD5A==',
            KeySalt: 'P1ep8VKlNMgMblolFu+F7Q=='
        }
    ]
};
