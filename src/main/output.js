const pkgName = require('../../package.json').name.toUpperCase();

const output =
{
	"info":(buffer = "") => { console.log(`[${pkgName}/INFO] ${buffer}`); },
	"warn":(buffer = "") => { console.log(`[${pkgName}/WARN] ${buffer}`); },
	"error":(buffer = "") => { console.log(`[${pkgName}/ERRO] ${buffer}`); }
};

exports.output = output;