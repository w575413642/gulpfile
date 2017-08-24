@echo off

set htmlDome = 

:main

cls

set /p var=tips:

if /i "%var%"=="gulp" goto :success

goto :main

:success

git clone git@github.com:w575413642/gulpfile.git

md origin

cd origin

md css

md img

md js

cd css

echo /*common*/ > common.css

cd ..

cd js

echo //common > common.js

cd ..

echo ^<!-- customer --^> >index.html

echo ^<!-- customer --^> >footer.html

echo ^<!-- customer --^> >header.html

echo ^<!-- customer --^> >common.html

cd ..

md program

set /p T = < index.txt

echo clone ---- git-Hub gulpfile

cd gulpfile

copy /y gulpfile.js %~sdp0

copy /y package.json %~sdp0

copy /y document.txt %~sdp0

echo move ---- gulpfile.js

tree /f

cd..

rd /s /q gulpfile

echo del git-Hub

echo success git gulp-file

echo  -------  look tree  ---------

Set /P Choice=(Y/N)：

If not "%Choice%"=="" (

  If "%Choice%"=="N" (

      cleanmgr

  ) else (

    If "%Choice%"=="Y" (

    	tree /f

    	pause

    )

  )
  
)

start npm install gulp gulp-util gulp-imagemin gulp-ruby-sass gulp-minify-css jshint gulp-jshint gulp-uglify gulp-rename gulp-concat gulp-clean gulp-livereload tiny-lr --save-dev 

document.txt

