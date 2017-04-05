-- 错误收集

Error = {
	_network  = nil,
	_netData = {
		url = "http://192.168.20.131:5000/ec",
		-- platform = device.platform,
		-- gameid = 5,
	},
	_isWork = false,	-- 是否启用改功能
}

-- 当前错误ID
local _eid = 1
-- 报错列表（使用队列顺序上传数据）
local _errorList = {}
-- 是否 正在发送网络
local _isSending = false

function Error:init(pdata)
	if pdata and type(pdata)=="table" then
		self._isWork = true
		for k,v in pairs(pdata)do
			self._netData[k] = v
		end
	end
end

function Error:addError(msg)
	
	if not self._isWork then return end

	if _eid == 1 then
		_errorList[_eid] = msg
		self:doNext()
	else
		if msg ~= _errorList[#_errorList] then
			_errorList[#_errorList+1] = msg
			self:doNext()
		end
	end
end

-- 发送网络
function Error:send(url)

	_isSending = true
	self._network = self._network or cc.XMLHttpRequest:new()
    self._network.responseType = cc.XMLHTTPREQUEST_RESPONSE_STRING
    self._network:open("GET", url)

    local function onReadyStateChanged()
        if self._network.readyState == 4 and (self._network.status >= 200 and self._network.status < 207) then
        	-- 上传成功 继续播下一个
            print("错误上传成功")
            _isSending = false
            _eid = _eid + 1
            Error:doNext()
        else
        	print("错误上传失败")
            -- print("readyState is:", self._network.readyState, "status is: ",self._network.status)
            _isSending = false
        end
    end

    self._network:registerScriptHandler(onReadyStateChanged)
    self._network:send()
end



function Error:doNext()
	if _errorList[_eid] and (not _isSending) then
		local str = string.format("%s?gameid=%s&platform=%s&error=%s",self._netData.url,self._netData.gameid,self._netData.platform,string.urlencode(_errorList[_eid]))
		-- print(str)
		Error:send(str)
	end
end


return Error

