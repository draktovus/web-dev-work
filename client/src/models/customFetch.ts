const API_URL = 'http://localhost:3000/api/v1/'

export function rest(url: string){
    return fetch(url).then(res => res.json())
}

export function api(url:string){
    return rest(API_URL + url)
}

export function postApi(url:string, object:any){
    return fetch(API_URL + url, {
        headers: {'Content-type': 'application/json'},
        method: 'POST',
        body: JSON.stringify(object)
    }).then(res => res.json())
}