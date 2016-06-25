// uudecode.ts - angular rc1.0
// based on: https://www.npmjs.com/package/@hakatashi/uuencode
System.register(['@angular/core', '../configs/@config'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, _config_1;
    var Uudecode;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_config_1_1) {
                _config_1 = _config_1_1;
            }],
        execute: function() {
            Uudecode = (function () {
                function Uudecode(cfg) {
                    this.config = cfg;
                } //ctor
                Uudecode.prototype.decodeChars = function (inBytes, inIndex, outBytes, outIndex) {
                    var c1 = inBytes[inIndex];
                    var c2 = inBytes[inIndex + 1];
                    var c3 = inBytes[inIndex + 2];
                    var c4 = inBytes[inIndex + 3];
                    var b1 = (c1 - 32 & 0x3F) << 2 | (c2 - 32 & 0x3F) >> 4;
                    var b2 = (c2 - 32 & 0x3F) << 4 | (c3 - 32 & 0x3F) >> 2;
                    var b3 = (c3 - 32 & 0x3F) << 6 | c4 - 32 & 0x3F;
                    outBytes[outIndex] = b1 & 0xFF;
                    outBytes[outIndex + 1] = b2 & 0xFF;
                    outBytes[outIndex + 2] = b3 & 0xFF;
                };
                Uudecode.prototype.encodeBytes = function (inBytes, inIndex, outBytes, outIndex) {
                    var c1 = inBytes[inIndex] >>> 2;
                    var c2 = inBytes[inIndex] << 4 & 0x30 | inBytes[inIndex + 1] >>> 4 & 0xF;
                    var c3 = inBytes[inIndex + 1] << 2 & 0x3C | inBytes[inIndex + 2] >>> 6 & 0x3;
                    var c4 = inBytes[inIndex + 2] & 0x3F;
                    outBytes[outIndex] = (c1 & 0x3F) + 32;
                    outBytes[outIndex + 1] = (c2 & 0x3F) + 32;
                    outBytes[outIndex + 2] = (c3 & 0x3F) + 32;
                    outBytes[outIndex + 3] = (c4 & 0x3F) + 32;
                };
                /**
                 * uuencode a value
                 *
                 * @param {(String|Buffer)} The value to be encoded.
                 * @returns {String} The encoded value.
                 */
                Uudecode.prototype.encode = function (inString) {
                    var stop = false;
                    var inIndex = 0;
                    var outIndex = 0;
                    var bytesRead = 0;
                    var inBytes = new Buffer(inString);
                    var buffLen = inBytes.length;
                    var outBytes = new Buffer(buffLen + buffLen / 3 + 1 + buffLen / 45 * 2 + 2 + 4);
                    do {
                        var n;
                        var bytesLeft = buffLen - bytesRead;
                        if (bytesLeft === 0) {
                            break;
                        }
                        if (bytesLeft <= 45) {
                            n = bytesLeft;
                        }
                        else {
                            n = 45;
                        }
                        outBytes[outIndex++] = (n & 0x3F) + 32;
                        for (var i = 0; i < n; i += 3) {
                            if (buffLen - inIndex < 3) {
                                var padding = new Array(3);
                                var z = 0;
                                while (inIndex + z < buffLen) {
                                    padding[z] = inBytes[inIndex + z];
                                    ++z;
                                }
                                this.encodeBytes(padding, 0, outBytes, outIndex);
                            }
                            else {
                                this.encodeBytes(inBytes, inIndex, outBytes, outIndex);
                            }
                            inIndex += 3;
                            outIndex += 4;
                        }
                        outBytes[outIndex++] = 10;
                        bytesRead += n;
                        if (n >= 45) {
                            continue;
                        }
                        stop = true;
                    } while (!stop);
                    return outBytes.toString().substring(0, outIndex);
                };
                /**
                 * uudecode a value
                 *
                 * @param {(String|Buffer)} The value to be decoded.
                 * @returns {Buffer} The decoded value.
                 */
                Uudecode.prototype.decode = function (inString) {
                    var stop = false;
                    var inIndex = 0;
                    var outIndex = 0;
                    var totalLen = 0;
                    var inBytes = new Buffer(inString);
                    var buffLen = inBytes.length;
                    var outBytes = new Buffer(buffLen);
                    do {
                        if (inIndex < buffLen) {
                            var n = inBytes[inIndex] - 32 & 0x3F;
                            ++inIndex;
                            if (n > 45) {
                                throw 'Invalid Data';
                            }
                            if (n < 45) {
                                stop = true;
                            }
                            totalLen += n;
                            while (n > 0) {
                                this.decodeChars(inBytes, inIndex, outBytes, outIndex);
                                outIndex += 3;
                                inIndex += 4;
                                n -= 3;
                            }
                            ++inIndex;
                        }
                        else {
                            stop = true;
                        }
                    } while (!stop);
                    return outBytes.slice(0, totalLen);
                };
                Uudecode = __decorate([
                    core_1.Injectable(),
                    __param(0, core_1.Inject(_config_1.CONFIG)), 
                    __metadata('design:paramtypes', [Object])
                ], Uudecode);
                return Uudecode;
            }());
            exports_1("Uudecode", Uudecode); //Uu
        }
    }
});
