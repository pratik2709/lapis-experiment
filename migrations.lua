local schema = require("lapis.db.schema")
local types = schema.types

return {
  [1] = function()
    schema.create_table("image", {
            { "id", types.id },
            { "name", types.varchar },
            { "description", types.varchar },
            { "url", types.varchar },
        })
  end
}