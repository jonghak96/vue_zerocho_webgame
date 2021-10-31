webpack을 쓰는 이유 : 수백개가 넘어가는 script를 관리하기 위해


[터미널]

해당 경로에서
npm init 입력.
package name: 입력.
엔터
엔터
엔터
npm install vue
npm install webpack webpack-cli -D

npm run build

npm i vue-loader -D
npm i vue-template-compiler -D

버전 기입 방법 : (npm i vue@2.7.0)


[webpack.config.js] 생성
module.exports = {
    entry: {
        app: "./main.js"
    },
    module: {},
    plugins: [],
    output: {
        filename: "app.js"
        filename: "[name].js"
    },
};

[main.js] 생성


[dist] 폴더 생성


[NumberBaseball.vue] 생성 (javascript 파일이라고 생각하면 됨.)


