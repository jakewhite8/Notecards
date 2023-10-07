const TypeScriptNotecards = {
  title: 'TypeScript',
  notecards: [
    ['What is TypeScript?', 'Definition: TypeScript is a statically typed programming language developed by Microsoft. It builds upon JavaScript by adding static type checking, interfaces, and other features to help developers write more robust and maintainable code. Key Feature: Static typing helps catch errors at compile-time and improves code quality.'], 
    ['TypeScript and JavaScript Compatibility', 'Feature: TypeScript is compatible with JavaScript. You can gradually adopt TypeScript by renaming .js files to .ts and adding type annotations as needed. Example: JavaScript code can be used within TypeScript files, and TypeScript code can be transpiled to JavaScript.'], 
    ['Type Annotations and Declarations', "Feature: TypeScript uses type annotations and declarations to specify the data types of variables, function parameters, and return values. Example: let age: number = 25; declares a variable age as a number type."], 
    ['Interfaces and Type Definitions', 'TypeScript introduces interfaces and type definitions to define the shape of objects or custom types.'], 
    ['TypeScript Compiler', 'Feature: TypeScript code is transpiled into JavaScript using the TypeScript compiler (tsc). It checks for type errors and generates JavaScript files that can run in browsers or Node.js. Usage: Run tsc followed by the filename to compile TypeScript files into JavaScript.']
  ] as Array<[string, string]>
}

export default TypeScriptNotecards