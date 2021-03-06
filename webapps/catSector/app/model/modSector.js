/*
 * File: app/model/modSector.js
 *
 * This file was generated by Sencha Architect version 3.5.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 5.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 5.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('catSector.model.modSector', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.field.Field'
    ],

    fields: [
        {
            name: 'sector_id'
        },
        {
            name: 'sector_name'
        },
        {
            name: 'sector_state'
        },
        {
            name: 'sector_country'
        },
        {
            name: 'created_at'
        },
        {
            name: 'is_active'
        },
        {
            name: 'inactive_date'
        }
    ]
});