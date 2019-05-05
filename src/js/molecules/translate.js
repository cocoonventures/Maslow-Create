import Atom from '../prototypes/atom'

export default class Translate extends Atom{
    
    constructor(values){
        super(values)
        
        this.addIO('input', 'geometry', this, 'geometry', '')
        this.addIO('input', 'xDist', this, 'number', 0)
        this.addIO('input', 'yDist', this, 'number', 0)
        this.addIO('input', 'zDist', this, 'number', 0)
        this.addIO('output', 'geometry', this, 'geometry', '')
        
        this.name = 'Translate'
        this.atomType = 'Translate'
        
        this.setValues(values)
    }
    
    updateValue(){
        
        try{
            this.value = this.findIOValue('geometry').translate([this.findIOValue('xDist'), this.findIOValue('yDist'), this.findIOValue('zDist')])
            this.clearAlert()
        }catch(err){
            this.setAlert(err)
        }
        
        super.updateValue()
    }
}