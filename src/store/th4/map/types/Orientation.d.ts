

namespace th4.map.camera {

    /**
     * Interface for orientation of the camera.
     */
    interface Orientation {
        /**
         * The heading of the camera in degrees.
         */
        get heading(): number;

        set heading(heading: number);

        get pitch(): number;

        set pitch(pitch: number);

        get roll(): number;

        set roll(roll: number);

        update(position:any)

    }
}