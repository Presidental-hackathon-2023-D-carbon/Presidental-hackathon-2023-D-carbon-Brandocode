### React

1. Install Modules Prepare
    
    ```
    npm cache clean --force
    ```
    
2. Delete node_modules folder
3. Install  Modules
    
    ```
    
    npm install
    ```
    
4. Debug **[Error message "error:0308010C:digital envelope routines::unsupported"](https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported)**
    
    In your package.json: change this line
    
    ```
    "start": "react-scripts start"
    
    ```
    
    to
    
    ```
    "start": "react-scripts --openssl-legacy-provider start"
    ```
    
5. Start React Front End
    
    ```python
    npm start
    ```