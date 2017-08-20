local lapis = require("lapis")
local config = require("lapis.config").get()

local app = lapis.Application()

app:get("/", function()
  return config.greeting
end)

app:get("/test", function(self)
  self.my_favorite_things = {
    "Cats",
    "Horses",
    "Skateboards"
  }
  return { json = { status = self.my_favorite_things } }
end)

return app
