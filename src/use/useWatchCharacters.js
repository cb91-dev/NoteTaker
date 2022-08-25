// Watch Character
import { watch } from 'vue'

export function useWatchCharacters(value,maxChars = 100) {
    watch(value, (newValue) => {
        if(newValue.length === maxChars){
            alert(`No more then ${maxChars} characters allowed sorry!`)
        }
    })
}