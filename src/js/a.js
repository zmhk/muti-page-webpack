// import $ from 'jquery'
import moduleA from '../components/module'
// import '../common/base.js'
import '../css/a.less'

console.log('i am a');
console.log(moduleA);

$("#toB").on("click",function () {
    location.href='./b.html'
});

