const pg = require('pg');

const config = {
    user: "mycruduser",
    password: "ypassword",
    host: "pg-b6f2d0d-ashwinmridul-task-management.d.aivencloud.com",
    port: 28780,
    database: "defaultdb",
    ssl: {
        rejectUnauthorized: true,
        ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUJ0chZduGxZat8oO0Fz4qgog+AgswDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvMDM0NTcxMTctYmQyOC00ZjA5LWFkMDAtMzA0ZThhMWI0
YWYyIFByb2plY3QgQ0EwHhcNMjQwNjE5MTgwMTUwWhcNMzQwNjE3MTgwMTUwWjA6
MTgwNgYDVQQDDC8wMzQ1NzExNy1iZDI4LTRmMDktYWQwMC0zMDRlOGExYjRhZjIg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBANcfeSug
vSJ/jo0Kz8+BViWj6NXqX0aMW+27NiFuZBKoWskGXWYyEwP0Tk6F5SLtcNB3RUWT
zgu74RRyvs29x8wmS7Te8NJ5WMngTIpfSdAQFWeecfdl9xcPeX8zYAHS0e/isOpj
6rcSha9Hh/wiJDXmkMfKBWev74cdrntNZGM4lY6Rtuc1pNZ9l9EimbQOJOMChTb/
yg15iMSXrFaPBb7hnrNyhve8Rcy/h8H4I79zVQohdHYlNgs6ojWduhscWFxn89yB
+5w6ALulyh89a35kPbtrQt3IbKa+g8kygY6zj++17N74Q3IcDNVeeKmiMZQqJaOd
CCVspiJCC6bMPG31GyNCk5hEh8RzMGhY1cKVXRW8Za3CWCJFrLPk/qb7wcI0YHPF
CqaQJFFoYK9cXn4srvdVjOJEJExmc8hzCidZMwwM/QW7hVEtQVwvOmDAFo1idfzL
YNG4Y+KiCGAjbUDvKL/nm4TWmT3dMo6r0FQjYfYHUi2ePa2dkSL3PGyVPQIDAQAB
oz8wPTAdBgNVHQ4EFgQURxkfd+PHoddiN84sm61W7C4+GywwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBABJEuaypyl2fehav
DBUZMfuMM0V2ZfMy8MnkbwUOS0sJ7wr1VdP+5hXmr0gFtKRleNWypVAIsUiCJDYu
sR1ZGc9AAQfH9hgtFb0J27hSK8WZoNdHPg7lQ0Nx9WnlCpwNinRXlJfRRksYH3jJ
yW1X3W9sme2Boga1CcQ4Y7rct0SnDml2a+CqbNJEvLAPhuHF2xSnSN/xMMernG3L
yCEAq1WPmKjc9AnDfiWkiE5epFseWZxe+F5dDdhO6KvaSUzNVkuZLUxUbudW1Vtj
BbxHQn+SxuMJ+YsZm9BVFMxphomx/h2FhDSO/AlePqRB/JUuPBAUm7VD5U8MKOF+
dcGN/nZzm6L5K4RAYo+lvSd3sRR2kDvNdJSLT4t1PR/LaO68S2T7WXfypjsHIiam
agdDNsDmwWqiM9pC7tgsY0IriEHKOsgc0fUJBAYTSfBEEK7wkr89CbQ9c5MWXWmc
m4r10eWvVC1yDRgdwKTnHQNLXgy0zDdmr8vWiH+ziRy58g+82g==
-----END CERTIFICATE-----`,
    },
};

const client = new pg.Client(config);

client.connect(function (err) {
    if (err)
        throw err;
    // client.end(function (err) {
    //     if (err)
    //         throw err;
    // });
});

module.exports = client;
