/**
 * Created by 11407 on 2018/7/31.
 */
// function hello(compiler: string) {
//    document.body.innerHTML='Hello from '+compiler;
// }
// hello("TypeScript");
import *  as $ from 'jquery';
import DpsSite from './Site';
import {sayHello} from "./greet";



export default class RunSite {
    run(): void {
        sayHello("TypeScript");

        let site = new DpsSite();
        site.testSite();

    }
}

let rs = new RunSite();
rs.run();