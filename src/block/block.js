/**
 * BLOCK: ux-my-business-hours
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */
//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { ServerSideRender, ToolbarButton, ToolbarGroup } = wp.components;
const { BlockControls } = wp.editor;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'ux/block-ux-gmb-hours', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Ux GMB Hours' ), // Block title.
	description: __( 'GMB open hours' ), // Block title.
	icon: 'calendar-alt', // shield Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Ux GMB Hours (keyword)' ),
		__( 'GMB Hours Block' ),
		__( 'wp-block' ),
	],
	attributes: {
		hours: { type: 'array', default: [] },
	},
	/**
   * The edit function describes the structure of your block in the context of the editor.
   * This represents what the editor will render when the block is used.
   *
   * The "edit" property must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   *
   * @param {Object} props Props.
   * @returns {Mixed} JSX Component.
   */
	edit: ( props ) => {
		// https://developers.google.com/maps/documentation/javascript/places#place_details
		function getGMBfields() {
			const request = {
				placeId: 'ChIJiQfqu_6ipBIRMIL1GKXlOmI',
				fields: [ 'id', 'icon', 'name', 'formatted_address', 'vicinity', 'url', 'opening_hours' ],
			};
			const service = new google.maps.places.PlacesService( document.getElementById( 'uxGMB' ) );
			service.getDetails( request, callback );
			function callback( place, status ) {
				if ( status === google.maps.places.PlacesServiceStatus.OK ) {
          console.log('res > ', place); // eslint-disable-line
					props.setAttributes( { hours: place.opening_hours.weekday_text } );
				}
			}
		}

		const onGetHours = () => {
			getGMBfields();
		};

		return (
			<div className={ props.className } id="uxGMB">
				<BlockControls>
					<ToolbarGroup>
						<ToolbarButton
							isPrimary
							icon="update-alt"
							label="Get Hours from Google My Business"
							onClick={ () => onGetHours() }
						/>
					</ToolbarGroup>
				</BlockControls>

				<div className="hours-container">
					<ServerSideRender
						block="ux/block-ux-gmb-hours"
						attributes={ props.attributes }
					/>
				</div>
			</div>
		);
	},

	/**
   * The save function defines the way in which the different attributes should be combined
   * into the final markup, which is then serialized by Gutenberg into post_content.
   *
   * The "save" property must be specified and must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   *
   * @param {Object} props Props.
   * @returns {Mixed} JSX Frontend HTML.
   */
	save: () => {
		return null;
	},
} );
