// 引入 gulp及组件
var gulp    = require('gulp'),                 
    imagemin = require('gulp-imagemin'),       
    sass = require('gulp-ruby-sass'),          
    minifycss = require('gulp-minify-css'),    
    jshint = require('gulp-jshint'), 
    htmlmin = require('gulp-htmlmin')          
    uglify  = require('gulp-uglify'),          
    // rename = require('gulp-rename'),           
    // concat  = require('gulp-concat'),          
    // clean = require('gulp-clean'),             
    tinylr = require('tiny-lr'),  
    server = tinylr(),             
    port = 8288,
    ignoreCatalog = './origin';
    // 各项打包
    gulp.task('html', function() {
           var options = {
                // removeComments: true,//清除HTML注释
                collapseWhitespace: true,//压缩HTML
                collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
                removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
                removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
                removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
                minifyJS: true,//压缩页面JS
                minifyCSS: true//压缩页面CSS
            },
            htmlSrc = ['./origin/p/*.html','./origin/m/*.html'],
            htmlDst = './program/';
            gulp.src(htmlSrc, {base: ignoreCatalog})
            .pipe(htmlmin(options))
            .pipe(gulp.dest(htmlDst));
    });

    // 不能用 ugJs
    gulp.task('ugjs', function () {
        return gulp.src('./program/script/*.js', {base: ignoreCatalog})
            .pipe(obfuscate())
            .pipe(gulp.dest('./program/script/'));
    });
    gulp.task('css', function () {
        var cssSrc = ['./origin/p/css/*.css','./origin/m/css/*.css'],
            cssDst = './program/';
            gulp.src(cssSrc, {base: ignoreCatalog})
            .pipe(minifycss())
            .pipe(gulp.dest(cssDst));
    });
    gulp.task('images', function(){
        var imgSrc = ['./origin/p/img/*','./origin/m/img/*','./origin/m/img/**/*','./origin/p/img/**/*','./origin/p/img/*','./origin/m/img/*','./origin/m/img/**/*','./origin/p/img/**/*'],
            imgDst = './program/';
            gulp.src(imgSrc, {base: ignoreCatalog})
            // .pipe(imagemin())
            .pipe(gulp.dest(imgDst));
    })
    gulp.task('images', function(){
    })
    // listen end
    gulp.task('mytask',['images','css','html','js'],function(){
        console.log('run ----> end')
    })
    function classIfication(Or){
        gulp.task('js', function () {
            var jsSrc = ['./origin/p/js/*.js','./origin/m/js/*.js'],
                jsDst ='./program/',
                ohter = ['./origin/p/js/jquery-1.11.2.min.js','./origin/m/js/jquery-1.11.2.min.js']
                gulp.src(jsSrc, {base: ignoreCatalog})                .on('end',function(){
                    gulp.src(jQ_other,{base: ignoreCatalog}).pipe(gulp.dest(jQ_target))
                })
                // .pipe(concat('index.js'))
                // .pipe(gulp.dest(jsDst))
                // .pipe(rename({ suffix: '.min' }))
                // .pipe(obfuscate());
                .pipe(uglify().on('error', function(err){
                    console.log(`return an error X ---- > ${err}`);
                    this.emit('end');
                }))
                .pipe(gulp.dest(jsDst));
                if(Or){return;}
                other(ohter,jsDst);
        });
        // run-js
        gulp.start('js');
    }
    // enumeration other js
    function other(jQ_other,jQ_target){
        var num = 0;
            gulp.src('./origin/**/*.*').on('data',function(file){
                console.log(file)
                console.log('look changes file ---->')
                console.log(file.history[0])
                num++;
            })
            // listen over
            .on('end',function(){
                gulp.src(jQ_other,{base: ignoreCatalog}).pipe(gulp.dest(jQ_target));
                console.log(`In the final, the step setting unable uglify file`)
                console.log(`  ----> address ----> ${jQ_other}`)
                console.log(`  ----> changes file ----> ${num}`)
            })
        };
    // 清空program
    gulp.task('clean', function() {
        gulp.src(['./program/css', './program/script', './program/images'], {read: false})
            .pipe(clean());
    });
     // 清除重构
    gulp.task('default',function(){
        // console.log(gulp)
        gulp.start('html');
        classIfication(true);
        gulp.start('css');
        gulp.start('pack');
    });
    // 清除重构
    gulp.task('pack',function(){
        gulp.start('html');
        classIfication(false)
        gulp.start('css');
        gulp.start('images');
        gulp.start('mytask')
    });
    // 压缩图片手动运行 时间太TM长了！
    gulp.task('bitch_img',function(){
        gulp.start('images');
    })
    // 运行监听
    gulp.task('watch',function(){

        server.listen(port, function(err){
            if (err) {
                return console.log(err);
            }
            gulp.watch(['./origin/m/*.html','./origin/p/*.html'], function(event){
                gulp.run('html');
            })

            gulp.watch(['./origin/p/css/*.css','./origin/p/css/*.css'], function(){
                gulp.run('css');
            });

            gulp.watch(['./origin/p/js/*.js','./origin/m/js/*.js'], function(){
                classIfication(true);
            });
            // 只复制不压缩
            gulp.watch(['./origin/p/img/**/*.{png,jpg,gif}','./origin/m/img/**/*.{png,jpg,gif}','./origin/m/img/*.{png,jpg,gif}','./origin/p/img/*.{png,jpg,gif}'], function(){
                gulp.run('images');
            });
            // gulp.watch('./origin/images/*', function(){
            //     gulp.run('images');
            // });
        });
    });