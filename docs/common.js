function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

function init(response_type) {
    let btn = document.getElementById('btnAction');

    let params = new URLSearchParams(window.location.hash.substring(1));
    let id_token = params.get('id_token');
    let search = new URLSearchParams(window.location.search.substring(1));
    let code = search.get('code');

    let callback = window.location.origin + window.location.pathname;

    if (id_token) {
        claims = parseJwt(id_token);
        console.log(claims);

        let info = document.getElementById('info');
        info.innerHTML = 'User ID ' + claims.sub + ' with E-mail ' + claims.email;
        btn.href = window.location.pathname;
        btn.innerText = 'Logout'
    } else if (code) {
        let info = document.getElementById('info');
        info.innerHTML =  '<pre>' + code + '</pre>';
        btn.href = window.location.pathname;
        btn.innerText = 'Logout'
    } else {
        fetch('/clientId').then(response => response.json()).then(data => {
            if (!data.clientId || !data.scopes || !data.webexBase) {
                console.error('Missing clientId, scopes or webexBase');
                return;
            }                
            btn.href = data.webexBase + '/v1/authorize?'+
            'response_type=' + response_type +
            '&client_id=' + data.clientId+
            '&redirect_uri='+ callback +
            '&scope='+ data.scopes+
            '&state=' + Math.random() +
            '&nonce=' + Math.random();
        btn.innerText = "Login"
        }).catch(error => {
            console.error('Error:', error);
        });
    }
}
