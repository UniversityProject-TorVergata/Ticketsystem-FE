var path = require('canonical-path');
var packagePath = __dirname;

var Package = require('dgeni').Package;

// Create and export a new Dgeni package
// We will use Gulp later on to generate that package
// Think of packages as containers, our 'myDoc' package contains other packages
// which themselves include processors, services, templates...
module.exports = new Package('myDoc', [
    require('dgeni-packages/ngdoc'),
    require('dgeni-packages/nunjucks')
])
    .config(function (log, readFilesProcessor, writeFilesProcessor) {

        // Set the log level to 'info', switch to 'debug' when troubleshooting
        log.level = 'info';

        // Specify the base path used when resolving relative paths to source and output files
        readFilesProcessor.basePath = path.resolve(packagePath, '../..');

        // Specify our source files that we want to extract
        readFilesProcessor.sourceFiles = [
            {include: 'src/app/**/**/*.js', basePath: 'src/app'}, // All of our application files
        ];

        // Use the writeFilesProcessor to specify the output folder for the extracted files
        writeFilesProcessor.outputFolder = 'docs/build';

        // Remember the sourceFiles section we added earlier? Let's now add our .md file to the list !
        readFilesProcessor.sourceFiles = [
            {include: 'src/app/**/**/*.js', basePath: 'src/app'}, // All of our application files

            // Our static Markdown documents
            // We are specifying the path and telling Dgeni to use the ngdocFileReader
            // to parse the Markdown files to HTMLs
            {include: 'docs/content/**/*.md', basePath: 'docs/content', fileReader: 'ngdocFileReader'}
        ];

    })

    .config(function (templateFinder) {
        // Specify where the templates are located
        templateFinder.templateFolders.unshift(path.resolve(packagePath, 'templates'));
    })

    .config(function (computePathsProcessor) {

        // Here we are defining what to output for our docType Module
        //
        // Each angular module will be extracted to it's own partial
        // and will act as a container for the various Components, Controllers, Services in that Module
        // We are basically specifying where we want the output files to be located
        computePathsProcessor.pathTemplates.push({
            docTypes: ['module'],
            pathTemplate: '${area}/${name}',
            outputPathTemplate: 'partials/${area}/${name}.html'
        });

        // Doing the same thing but for regular types like Services, Controllers, etc...
        // By default they are grouped in a componentGroup and processed
        // via the generateComponentGroupsProcessor internally in Dgeni
        computePathsProcessor.pathTemplates.push({
            docTypes: ['componentGroup'],
            pathTemplate: '${area}/${moduleName}/${groupType}',
            outputPathTemplate: 'partials/${area}/${moduleName}/${groupType}.html'
        });

        // Document this part a little bit more?

        // Build custom paths and set the outputPaths for "content" pages
        computePathsProcessor.pathTemplates.push({
            docTypes: ['content'],
            getPath: function (doc) {
                var docPath = path.dirname(doc.fileInfo.relativePath);
                if (doc.fileInfo.baseName !== 'index') {
                    docPath = path.join(docPath, doc.fileInfo.baseName);
                }
                return docPath;
            },
            outputPathTemplate: 'partials/${path}.html'
        });


    })