import { App, Server } from "./core";

// Start Express server.
// ----------------------------------------------------------------------------
Server.listen(3000, () => {
    console.log(("App is running at http://localhost:%d in %s mode"), 3000, App.get("env"));
    console.log("Press CTRL-C to stop\n");

    // console.log("[Debug] Outputting all mounted routes");
    // App._router.stack.forEach(print.bind(undefined, []));
});

function print (path: any, layer: any) {
    if (layer.route) {
        layer.route.stack.forEach(print.bind(undefined, path.concat(split(layer.route.path))));
    } else if (layer.name === "router" && layer.handle.stack) {
        layer.handle.stack.forEach(print.bind(undefined, path.concat(split(layer.regexp))));
    } else if (layer.method) {
        console.log("%s /%s",
            layer.method.toUpperCase(),
            path.concat(split(layer.regexp)).filter(Boolean).join("/"));
    }
}

function split (thing: any) {
    if (typeof thing === "string") {
        return thing.split("/");
    } else if (thing.fast_slash) {
        return "";
    } else {
        const match = thing.toString()
            .replace("\\/?", "")
            .replace("(?=\\/|$)", "$")
            .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);
        return match
            ? match[1].replace(/\\(.)/g, "$1").split("/")
            : "<complex:" + thing.toString() + ">";
    }
}