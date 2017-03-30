-- 错误收集

local Error = {
	_network  = nil,
}

-- 当前错误ID
local _eid = 1
-- 报错列表（使用队列顺序上传数据）
local _errorList = {}
-- 是否 正在发送网络
local _isSending = false
-- 地址 
local _netData = {
	url = "http://192.168.20.131:5000/ec",
	platform = device.platform,
	gameid = 0,
}

function Error:init(gameid)
	_netData.gameid = gameid
end

function Error:addError(msg)
	
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
            print(self._network.response)
            _isSending = false
            _eid = _eid + 1
            Error:doNext()
        else
            print("readyState is:", self._network.readyState, "status is: ",self._network.status)
        end
    end

    self._network:registerScriptHandler(onReadyStateChanged)
    self._network:send()
end



function Error:doNext()
	if _errorList[_eid] and (not _isSending) then
		local str = string.format("%s?gameid=%s&platform=%s&error=%s",_netData.url,_netData.gameid,_netData.platform,string.urlencode(_errorList[_eid]))
		print(str)
		Error:send(str)
	end
end


return Error

