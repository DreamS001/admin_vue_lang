'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://linf.jie360.com.cn"'
  // BASE_API: '"http://shipz.jie360.com.cn"'
  BASE_API: '"/api"'
})

