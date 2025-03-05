import '@babel/polyfill';
import 'modern-css-reset';
import 'normalize.css';
import '../sass/index.scss';

import {date, year, month} from './data.js';

import{createCalendar} from './create-calendar.js';


createCalendar(year, month, 'calendar1');
createCalendar(year, month + 1, 'calendar2');

