/**
 * @fileOverview This file has functions related to getting the day of the week from a date string.
 * @author <a href="http://www.trevmex.com/">Trevor Menagh</a>
 * @version 1.0.0
 * Written on 7/5/2010 (Monday :D)
 */

"use strict";

/**
 * @description An algorithm to calculate the day of the week for any Julian or Gregorian calendar date.
 * @see <a href="http://en.wikipedia.org/wiki/Zeller%27s_congruence">Zeller's congruence</a>
 * @function
 * @param {Number} dayOfMonth The day of the month.
 * @param {Number} month The month.
 * @param {Number} year The year.
 * @param {Boolean} [iso] If true return the ISO week date Day-of-Week (1 = Monday to 7 = Sunday), default is false.
 * @param {String} [calendarType] "julian" or "gregorian", default is "gregorian".
 * @param {String[]} [i18nDayMapping] An array of strings mapping "Saturday" to "Friday" in a given language (default is English, ignored if iso is true).
 * @returns {String|Number} The day of the week ("Monday" to "Sunday"), or the ISO week date Day-of-Week if iso is true.
 * @throws {MissingParameters} If year, month, or dayOfMonth are not passed in.
 * @throws {InvalidParameters} If the day of the month or the month are not valid.
 * @throws {InvalidParameters} If the calendar type is supplied and is not valid.
 * @throws {InvalidParameters} If iso is supplied and is not valid.
 * @throws {InvalidParameters} If i18nDayMapping is supplied and is not valid.
 */
function zeller(dayOfMonth, month, year, iso, calendarType, i18nDayMapping) {
    // Set the parameters for Zeller's congruence
    var q = dayOfMonth,
        m = month,
        Y = (m < 3) ? year - 1 : year,
        h,
        d,
        i;

    // Validations
    if (dayOfMonth === undefined || dayOfMonth === null) {
        throw "MissingParameters: The day of the month is required.\nFormat: zeller(dayOfMonth, month, year, [iso], [calendarType], [i18nDayMapping])";
    }
    if (month === undefined || month === null) {
        throw "MissingParameters: The month is required.\nFormat: zeller(dayOfMonth, month, year, [iso], [calendarType], [i18nDayMapping])";
    }
    if (year === undefined || year === null) {
        throw "MissingParameters: The year is required.\nFormat: zeller(dayOfMonth, month, year, [iso], [calendarType], [i18nDayMapping])";
    }
    if (month < 1 || month > 12) {
        throw "InvalidParameters: The month must be between 1 (January) and 12 (December). " + month + " is invalid.\nFormat: zeller(dayOfMonth, month, year, [iso], [calendarType], [i18nDayMapping])";
    }
    if (dayOfMonth < 1 || dayOfMonth > 31) {
        throw "InvalidParameters: The day of the month must be between 1 and 31. " + dayOfMonth + " is invalid.\nFormat: zeller(dayOfMonth, month, year, [iso], [calendarType], [i18nDayMapping])";
    }
    if (month === 4 || month === 6 || month === 9 || month === 11) {
        if (dayOfMonth > 30) {
            throw "InvalidParameters: Month " + month + " does not have day " + dayOfMonth + ".\nFormat: zeller(dayOfMonth, month, year, [iso], [calendarType], [i18nDayMapping])";
        }
    }
    if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
        // This is a leap year
        if (month === 2 && dayOfMonth > 29) {
            throw "InvalidParameters: Month 2 (February) does not have day " + dayOfMonth + " this year (" + year + ").\nFormat: zeller(dayOfMonth, month, year, [iso], [calendarType], [i18nDayMapping])";
        }
    } else {
        // This is not a leap year
        if (month === 2 && dayOfMonth > 28) {
            throw "InvalidParameters: Month 2 (February) does not have day " + dayOfMonth + " this year (" + year + ").\nFormat: zeller(dayOfMonth, month, year, [iso], [calendarType], [i18nDayMapping])";
        }
    }
    if ((calendarType !== undefined && calendarType !== null) && !(calendarType.toLowerCase() === "gregorian" || calendarType.toLowerCase() === "julian")) {
        throw "InvalidParameters: Calendar type must be \"Gregorian\" or \"Julian\". " + calendarType + " is invalid.\nFormat: zeller(dayOfMonth, month, year, [iso], [calendarType], [i18nDayMapping])";
    }
    if ((iso !== undefined && iso !== null) && !(iso === true || iso === false)) {
        throw "InvalidParameters: ISO must be true or false. " + iso + " is invalid.\nFormat: zeller(dayOfMonth, month, year, [iso], [calendarType], [i18nDayMapping])";
    }
    if ((i18nDayMapping !== undefined && i18nDayMapping !== null)) {
        if (i18nDayMapping.length !== 7) {
            throw "InvalidParameters: Internationalized Day Mapping must be an array of 7 strings from Saturday to Friday. " + i18nDayMapping + " is invalid.\nFormat: zeller(dayOfMonth, month, year, [iso], [calendarType], [i18nDayMapping])";
        }
        for (i = i18nDayMapping.length - 1; i >= 0; i -= 1) {
            // Check to see if this is a native string
            if (typeof(i18nDayMapping[i]) !== "string") {
                // Check to see if this is a String object
                if (!(i18nDayMapping[i] instanceof String)) {
                    throw "InvalidParameters: Internationalized Day Mapping must be an array of 7 strings from Saturday to Friday. " + i18nDayMapping[i] + " at position " + i + " is invalid.\nFormat: zeller(dayOfMonth, month, year, [iso], [calendarType], [i18nDayMapping])";
                }
            }
        }
    }

    // Set default values
    if (calendarType === undefined || calendarType === null) {
        calendarType = "gregorian";
    }
    if (iso === undefined || iso === null) {
        iso = false;
    }
    if (iso === false) {
        if (i18nDayMapping === undefined || i18nDayMapping === null) {
            i18nDayMapping = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        }
    }

    if (calendarType.toLowerCase() === "gregorian") {
        h = (Math.floor(q + (Math.floor((m + 1) * 26) / 10) + Y + Math.floor(Y / 4) + (6 * Math.floor(Y / 100)) + Math.floor(Y / 400))) % 7;
    } else /* calendarType.toLowerCase() === "julian" */ {
        h = (Math.floor(q + (Math.floor((m + 1) * 26) / 10) + Y + Math.floor(Y / 4) + 5)) % 7;
    }

    if (iso) {
        d = ((h + 5) % 7) + 1;
    } else /* !iso */ {
        d = i18nDayMapping[h];
    }

    return d;
}

/**
 * @description Given a date and a date format, return which day of the week it is.
 * @param {String} date A string containing today's date.
 * @param {Boolean} [iso] If true return the ISO week date Day-of-Week (1 = Monday to 7 = Sunday), default is false.
 * @param {String} [calendarType] "Julian" or "Gregorian", default is "Gregorian".
 * @param {String[]} [i18nDayMapping] An array of strings mapping "Saturday" to "Friday" in a given language (default is English)
 * @returns {String|Number} The day of the week ("Monday" to "Sunday"), or the ISO week date Day-of-Week if iso is true.
 */
String.prototype.getDay = function (iso, calendarType, i18nDayMapping) {
    var date = new Date(this);
    
    return zeller(date.getDate(), date.getMonth() + 1, date.getFullYear(), iso, calendarType, i18nDayMapping);
};