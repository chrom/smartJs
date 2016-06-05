/**
 * Created by user on 24.05.2016.
 */
import styles from '../../dist/styles.css';

const re = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
const rePass = /.\d+./;


export function validationHelper(array, tempEl){
	for (let i = 0; i < array.length; i++) {
		for (let key in array[i]) {
			let currEl = array[i][key];
			let errorSpan = tempEl.find('span[data-error-for='+key+']')[0];
			switch(key) {
				case 'email':
					if (!re.test(currEl) || currEl === '') {
						errorSpan.classList.add(styles['visible-error']);
					}
					else {
						errorSpan.classList.remove(styles['visible-error']);
					}
					break;
				case 'password':
				case 'confirmPassword':
					if (currEl.length < 6 || !rePass.test(currEl) || currEl === '') {
						errorSpan.classList.add(styles['visible-error']);
					}
					else {
						errorSpan.classList.remove(styles['visible-error']);
					}
					break;
				case 'async-email':
					errorSpan.classList.add(styles['visible-error']);
					break
			}
		}
	}
}