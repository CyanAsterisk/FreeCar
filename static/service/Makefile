static:
	../node_modules/.bin/pbjs -t static -w es6 ../../server/idl/api.proto --no-create --no-encode --no-decode --no-verify --no-delimited --force-number -o codegen/api_pb_tmp.js
	echo 'import * as $protobuf from "protobufjs";\n' > codegen/api_pb.js
	cat codegen/api_pb_tmp.js >> codegen/api_pb.js
	rm codegen/api_pb_tmp.js
	../node_modules/.bin/pbts -o codegen/api_pb.d.ts codegen/api_pb.js
