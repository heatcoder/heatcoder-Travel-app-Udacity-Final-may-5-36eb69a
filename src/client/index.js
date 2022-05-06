import { innerHtml } from './js/innerHtml'
import { dateExit, dateEntry } from './js/startandenddate'
import { handleSubmit } from './js/formHandler'
import './styles/resets.scss'
import './styles/base.scss'
import './styles/form.scss'
import './styles/header.scss'

document.addEventListener("DOMContentLoaded", function ()  {
    document.getElementById("button").addEventListener("click", handleSubmit);
});

export {handleSubmit, innerHtml, dateExit,dateEntry}
