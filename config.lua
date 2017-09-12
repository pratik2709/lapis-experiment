-- config.lua
local config = require("lapis.config")

config("development", {
    mysql = {
        host = "127.0.0.1",
        port = 3306,
        user = "root",
        password = "root2709",
        database = "lua_test"
    }
})

return config