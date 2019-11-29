import SVGOverlay from "./SVGOverlay";

class OverlayBoundsCreator {
    constructor(mapEl) {
        // Create the map
        this.map = new google.maps.Map(mapEl, {
            zoom: 18,
            center: { lat: -33.8578335, lng: 151.2086526 }
        });

        // Custom SVG Overlay String
        const svgString = `<?xml version="1.0" encoding="UTF-8"?>
		<svg width="177px" height="593px" viewBox="0 0 177 593" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
			<!-- Generator: Sketch 58 (84663) - https://sketch.com -->
			<title>Map/MarketShape</title>
			<desc>Created with Sketch.</desc>
			<g id="Phase-1.1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" fill-opacity=".3">
				<g id="Map7-MarketDetail-XL-Copy" transform="translate(-859.000000, -79.000000)" fill="#00758D" fill-rule="nonzero" stroke="#FFFFFF" stroke-width="2">
					<g id="Map/MarketShape" transform="translate(860.000000, 81.000000)">
						<path d="M141.274894,568.236845 L25.3773435,543.789706 L27.1718685,538.434251 L29.7186758,530.800791 C56.7575568,449.541752 70.5425162,401.003896 71.4714545,382.979169 L71.496717,382.414799 C72.0443005,367.903836 75.9382668,349.737228 82.724664,334.056537 C91.1211674,314.655525 103.173541,300.322599 118.724166,292.936053 L125.014549,289.940023 L132.107059,286.539472 C151.394559,277.254304 163.824945,270.935851 169.663994,267.432422 C174.688702,264.417597 176.467959,257.993055 173.710068,252.822863 L47.7100675,16.6119255 C46.6971568,14.7130319 45.1494642,13.152984 43.2586845,12.1250068 L21.2586845,0.164069336 L10.7503967,19.4921807 L29.8518148,29.8772201 L149.170126,253.562062 L146.978836,254.688077 L143.542772,256.429597 C135.096368,260.680408 123.651218,266.239954 109.284916,273.063947 C88.3589425,283.003785 72.8819987,301.409279 62.5344173,325.318463 C54.6276291,343.587936 50.159633,364.432579 49.5123642,381.585201 C48.9056887,397.662103 32.4156031,454.29472 0.58363921,548.477953 C-1.5259428,554.719706 2.2874371,561.403293 8.73418769,562.763155 L136.734188,589.763155 L141.274894,568.236845 Z" id="Path-9"></path>
					</g>
				</g>
			</g>
		</svg>`;

        // Set bottom left and top right coords
        this.swLatLng = [-33.859203000000015, 151.208072];
        this.neLatLng = [-33.856578999999975, 151.20900100000006];

        // Create bounds
        var bounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(...this.swLatLng),
            new google.maps.LatLng(...this.neLatLng)
        );

        // Create the overlay
        this.overlay = new SVGOverlay(bounds, svgString, this.map);

        // Attach button handlers
        this.attachHandlers();
    }

    attachHandlers = () => {
        const swLeft = document.getElementById("left-button");
        const swRight = document.getElementById("right-button");
        const swUp = document.getElementById("up-button");
        const swDown = document.getElementById("down-button");

        const neLeft = document.getElementById("left-button-2");
        const neRight = document.getElementById("right-button-2");
        const neUp = document.getElementById("up-button-2");
        const neDown = document.getElementById("down-button-2");

        const delta = 0.00001;

        const updateWithNewBounds = () => {};

        swLeft.addEventListener("click", () => {
            this.swLatLng[1] -= delta;
            this.updateWithNewBounds();
        });

        swRight.addEventListener("click", () => {
            this.swLatLng[1] += delta;
            this.updateWithNewBounds();
        });

        swUp.addEventListener("click", () => {
            this.swLatLng[0] += delta;
            this.updateWithNewBounds();
        });

        swDown.addEventListener("click", () => {
            this.swLatLng[0] -= delta;
            this.updateWithNewBounds();
        });

        neLeft.addEventListener("click", () => {
            this.neLatLng[1] -= delta;
            this.updateWithNewBounds();
        });

        neRight.addEventListener("click", () => {
            this.neLatLng[1] += delta;
            this.updateWithNewBounds();
        });

        neUp.addEventListener("click", () => {
            this.neLatLng[0] += delta;
            this.updateWithNewBounds();
        });

        neDown.addEventListener("click", () => {
            this.neLatLng[0] -= delta;
            this.updateWithNewBounds();
        });
    };

    updateWithNewBounds = () => {
        console.log(`
			// Set bottom left and top right coords
			this.swLatLng = [${this.swLatLng.join(", ")}];
			this.neLatLng = [${this.neLatLng.join(", ")}];
		`);
        this.overlay.bounds_ = new google.maps.LatLngBounds(
            new google.maps.LatLng(...this.swLatLng),
            new google.maps.LatLng(...this.neLatLng)
        );
        this.overlay.draw();
    };
}

google.maps.event.addDomListener(window, "load", () => {
    const map = document.getElementById("map");
    new OverlayBoundsCreator(map);
});
