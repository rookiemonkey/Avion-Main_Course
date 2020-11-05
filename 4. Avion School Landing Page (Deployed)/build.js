const path = require('path');
const fs = require('fs');
const ncp = require('ncp').ncp;
const minify = require('minify');

// ===========================================================================
// VARIABLES
// ===========================================================================

/**
 *  @STEP1
 *  DEFINE OUTPUT DESTINATION PATH
 *  !NOTE: take note of the naming pattern
 */

// TARGET DESTINATION
const outputDir_main = path.join(__dirname, './build');
const outputDir_sub = '/assets';
const outputDir_html = `${outputDir_main}`;
const outputDir_css = `${outputDir_main}${outputDir_sub}/css`;
const outputDir_js = `${outputDir_main}${outputDir_sub}/js`;







/**
 *  @STEP2
 *  DEFINE DEST PATH OF THE TARGET FILES
 *  !NOTE: take note of the naming pattern
 */



/**
 * !JAVASCRIPT CSS HTML
 * TARGET FILES (RELATIVE PATH) TO MINIFY (ARRAY)
 *  *1st - file to minify (js, html, css)
 *  *2nd - filename of the output file
 *  *3rd - extenstion of the output file
 * 
 *  * const assets = [
 *  * [`${path.join(__dirname, './index.html')}`, '/index', 'html'],
 *  * [`${path.join(__dirname, './assets/css/style.css')}`, '/style', 'css'],
 *  * [`${path.join(__dirname, './assets/js/wow.js')}`, '/wow', 'js'],
 *  *]
 */
const assets = [
    [`${path.join(__dirname, './index.html')}`, '/index', 'html'],
    [`${path.join(__dirname, './assets/css/font-awesome.min.css')}`, '/font-awesome.min', 'css'],
    [`${path.join(__dirname, './assets/css/main.css')}`, '/main', 'css'],
    [`${path.join(__dirname, './assets/js/main.js')}`, '/main', 'js']
]




/**
 *  !OTHER FILES (FONTS etc..)
 *  *1st - directory to copy
 *  *2nd - destination directory
 * 
 *  *const others = [
 *  * [`${path.join(__dirname, './assets/fonts')}`, `${outputDir_main}${outputDir_sub}/fonts`],
 *  * [`${path.join(__dirname, './assets/vendors')}`, `${outputDir_main}${outputDir_sub}/vendors`],
 *  * ]
 */

const others = [
    [`${path.join(__dirname, './assets/fonts')}`, `${outputDir_main}${outputDir_sub}/fonts`],
    [`${path.join(__dirname, './assets/images')}`, `${outputDir_main}${outputDir_sub}/images`],
    [`${path.join(__dirname, './assets/videos')}`, `${outputDir_main}${outputDir_sub}/videos`]
]

// copy/overwrite the netlify config file to the build folder, might need to rerun the script
// becuase build folder doesn't exisit yet
fs.copyFile('./netlify.toml', './build/netlify.toml', (err) => {
    if (err) throw err;
    console.log('source.txt was copied to destination.txt');
});









































// ===========================================================================
// MINIFICATION PROCESS
// NOTE:    Do not touch the code below unless you want to change something
//          on the minification process
// ===========================================================================


/**
 * !CREATE ROOT & SUB DIR FOR ASSETS ONLY IF NOT EXISTING
 */

fs.access(outputDir_main, function (err) {
    if (err && err.code === 'ENOENT') {
        fs.mkdir(outputDir_main, function () {
            console.log(`✓ OUTPUT Root Destination: '${outputDir_main}' not existing, created instead`)
        });
    }
});

fs.access(`${outputDir_main}${outputDir_sub}`, function (err) {
    if (err && err.code === 'ENOENT') {
        fs.mkdir(`${outputDir_main}${outputDir_sub}`, function () {
            console.log(`✓ OUTPUT Sub Destination: '${outputDir_main}${outputDir_sub}' not existing, created instead`)
        });
    }
});

/**
 * !JS/CSS MINIFICATION OPTIONS
 */
const options = {
    html: {
        removeComments: true,
        removeCDATASectionsFromCDATA: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: false,
        removeEmptyElements: false,
        removeOptionalTags: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,
        minifyCSS: true,
    },
    css: { compatibility: '*' },
    js: { ecma: 5 },
}


/**
 * !JS/CSS MINIFICATION PROCESS
 */
assets.forEach(asset => {

    const [filePath, fileOutputName, extenstion] = asset;

    if (!fs.existsSync(filePath)) {
        return new Error(`[ERROR: File Not Existing]: ${filePath}`)
    }

    minify(filePath, options)

        .then(minifiedBuffer => {
            let destination;

            switch (extenstion) {
                case 'html': destination = outputDir_html; break;
                case 'css': destination = outputDir_css; break;
                case 'js': destination = outputDir_js; break;
                default: destination = false; break;
            }

            if (!destination) {
                console.log(`[ERROR: File Not Supported/Not Minified]: ${filePath}`)
            }

            const outputFile = `${destination}${fileOutputName}.${extenstion}`;

            fs.access(destination, function (error) {

                // create directory if not existing
                if (error && error.code === 'ENOENT') {
                    fs.mkdir(destination, function () {
                        console.log(`✓ Target Destination: '${destination}' not existing, created instead`)

                        console.log(`✓ Succesfully Minified : '${destination}${fileOutputName}.${extenstion}'`)

                        fs.writeFileSync(outputFile, minifiedBuffer);
                    });
                }

                else {
                    console.log(`✓ Succesfully Minified : '${destination}${fileOutputName}.${extenstion}'`)

                    fs.writeFileSync(outputFile, minifiedBuffer);
                }
            });
        })

        .catch(error => console.log(error));
})







// ===========================================================================
// OTHER FILES COPY PROCESS
// Copies other files (not css, js, html) to the output main directory
// ncp(source, destination, callback)  
// ===========================================================================

others.forEach(directory => {
    const [source, output] = directory;

    fs.access(output, function (err) {
        if (err && err.code === 'ENOENT') {

            // err.code === 'ENOENT' if sub directory is not existing
            fs.mkdir(output, function () {
                console.log(`✓ OUTPUT Sub Destination: '${output}' not existing, created instead`)

                ncp(source, output,
                    function (err) {
                        if (err) {
                            return console.error(err);
                        }

                        console.log(`✓ Files from '${output}' copied to '${output}'`);
                    });
            });
        }

        else {
            // just continue to copy
            ncp(source, output,
                function (err) {
                    if (err) {
                        return console.error(err);
                    }

                    console.log(`✓ Files from '${output}' copied to '${output}'`);
                });
        }
    });
})