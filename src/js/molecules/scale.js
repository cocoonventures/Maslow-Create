import Atom from '../prototypes/atom'

/**
 * This class creates the scale atom.
 */
export default class Scale extends Atom{
    
    /**
     * The constructor function.
     * @param {object} values An array of values passed in which will be assigned to the class as this.x
     */ 
    constructor(values){
        
        super(values)
        
        this.addIO('input', 'geometry', this, 'geometry', '', false, true)
        this.addIO('input', 'multiple', this, 'number', 10)
        this.addIO('output', 'geometry', this, 'geometry', '')
        
        /**
         * This atom's name
         * @type {string}
         */
        this.name = 'Scale'
        /**
         * This atom's type
         * @type {string}
         */
        this.atomType = 'Scale'
        
        this.setValues(values)
    }
    
    /**
     * Take the input geometry and pass it to a worker thread to be scaled.
     */ 
    updateValue(){
        
        try{
            const values = [this.findIOValue('geometry'), this.findIOValue('multiple')]
            this.basicThreadValueProcessing(values, "scale")
        }catch(err){this.setAlert(err)}
    }
}