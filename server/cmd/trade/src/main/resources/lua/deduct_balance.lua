local balance_key = KEYS[1]
local deduct_amount = tonumber(ARGV[1])

local current_balance = tonumber(redis.call('get', balance_key) or 0)

if current_balance >= deduct_amount then
    local new_balance = current_balance - deduct_amount
    redis.call('set', balance_key, new_balance)
    return new_balance
else
    return -1
end
