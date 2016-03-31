/*
 * File: app/model/modTaxiFares.js
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

Ext.define('catTaxiFares.model.modTaxiFares', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.field.Field'
    ],

    fields: [
        {
            name: 'taxi_fare_id'
        },
        {
            name: 'taxi_type_fare'
        },
        {
            name: 'sector_start'
        },
        {
            name: 'zone_end'
        },
        {
            name: 'taxi_start'
        },
        {
            name: 'taxi_km'
        },
        {
            name: 'taxi_min'
        },
        {
            name: 'taxi_min_waiting'
        },
        {
            name: 'cost'
        },
        {
            name: 'created_date'
        },
        {
            name: 'isactive'
        },
        {
            name: 'inactive_date'
        }
    ]
});