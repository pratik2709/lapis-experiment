local lapis = require("lapis")
local config = require("lapis.config").get()
local respond_to = require("lapis.application").respond_to
local Model = require("lapis.db.model").Model
local csrf = require("lapis.csrf")

local app = lapis.Application()

app:get("/greet", function()
    return config.greeting
end)

app:enable("etlua")
app.layout = require "views.layout"
app:get("/", function()
     return { render = "index" }
end)

-- an s3 credential API

app:get("/test", function(self)
    self.my_favorite_things = {
        "Cats",
        "Horses",
        "Skateboards"
    }
    --    print(self)
    return { json = { status = self.my_favorite_things } }
end)

-- post request to store name and url of the uploaded images
app:post("/newone/create/", function(self)

    print("inside post")
    print("inside post2")
    csrf.assert_token(self)
    local Image = Model:extend("image")
    print("over here")
    print(self.params.name)
--    print(self.params.description)
--    print(self.params.url)
    local user = Image:create({
        name = self.params.name,
        description = self.params.description,
        url = self.params.url
    })
    return { json = { status = "self.params" } }
end)

app:match("newone", "/newone", respond_to({
    GET = function(self)
        local Image = Model:extend("image")
        local user = Image:select()
        return { json =  user }
    end
}))

return app
