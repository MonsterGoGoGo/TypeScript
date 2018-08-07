/**
 * Created by 11407 on 2018/7/31.
 */
export function sayHello(name: string) {
    let  result:string = 'Hello from '+ name;
    document.body.innerText=  result;
    return result;
}