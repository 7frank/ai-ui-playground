
// Test 1: Test for function existence
describe("4.ts", () => {
    it("should import the createFile function from 4.ts", () => {
        const {createFile} = require("./4.ts");
        expect(createFile).toBeDefined();
    });
});

// Test 2: Test for correct file extension inference
describe("4.ts", () => {
    it("should correctly infer the language from the file extension '.ts'", () => {
        const {createFile} = require("./4.ts");
        const file = createFile("main", ".ts");
        expect(file.language).toBe("TypeScript");
    });
});

// Test 3: Test for correct file name creation
describe("4.ts", () => {
    it("should create a new file with the given name", () => {
        const {createFile} = require("./4.ts");
        const file = createFile("main", ".ts");
        expect(file.name).toBe("main.ts");
    });
});
