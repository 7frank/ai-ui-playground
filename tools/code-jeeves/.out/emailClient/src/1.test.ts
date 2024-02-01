

describe('CreateProjectDirectory', () => {
    it('should create a new project directory', () => {
        // Arrange
        const fileName = 'index.js';
        
        // Act 
        const result = CreateProjectDirectory(fileName);
        
        // Assert
        expect(result).toEqual('Project Directory Created')
    });
    
    it('should infer the language from the file extension', () => {
        // Arrange
        const fileName = 'index.js';
        
        // Act 
        const result = CreateProjectDirectory(fileName);
        
        // Assert
        expect(result).toEqual('Language: JavaScript');
    });
    
    it('should import the function from ./1.', () => {
        // Arrange 
        const fileName = 'index.js';
        
        // Act 
        const result = CreateProjectDirectory(fileName);
        
        // Assert
        expect(result).toEqual('Function Imported');
    });
    
    it('should use BDD for naming describe and it blocks', () => {
        // Arrange 
        const fileName = 'index.js';
        
        // Act 
        const result = CreateProjectDirectory(fileName);
        
        // Assert
        expect(result).toEqual('Naming Convention: BDD');
    });
    
    it('should use the Arrange-act-Assert pattern', () => {
        // Arrange 
        const fileName = 'index.js';
        
        // Act 
        const result = CreateProjectDirectory(fileName);
        
        // Assert
        expect(result).toEqual('Pattern: Arrange-act-Assert');
    });
    
    it('should remove redundancy', () => {
        // Arrange 
        const fileName = 'index.js';
        
        // Act 
        const result = CreateProjectDirectory(fileName);
        
        // Assert
        expect(result).toEqual('Redundancy Removed');
    });
    
    it('should create utility functions if function becomes too big', () => {
        // Arrange 
        const fileName = 'index.js';
        
        // Act 
        const result = CreateProjectDirectory(fileName);
        
        // Assert
        expect(result).toContain('Utility Functions Created');
    });
    
    it('should only generate necessary code and not anything else', () => {
        // Arrange 
        const fileName = 'index.js';
        
        // Act 
        const result = CreateProjectDirectory(fileName);
        
        // Assert
        expect(result).toContain('Unnecessary Code Removed');
    });
});
