<?php

/*
* Removes annoying gravity forms spinner
*/

add_filter( 'gform_confirmation_anchor', '__return_false' );

/*
*       Form confirmation shortcode
*/
function form_confirmation_shortcode()
{
    return '

            <div class="prices">
                <p>'. get_field('bevestiging_price_title', 'option') .'</p>
                <div class="price">
                    <span>Standaard tarief</span>
                    <span>'. get_field('bevestiging_standard_price', 'option') .'</span>
                </div>
                <div class="price">
                    <span>Per 15 minuten extra</span>
                    <span>'. get_field('bevestiging_per_extra', 'option') .'</span>
                </div>
                <div class="price">
                    <span>Voorrijkosten</span>
                    <span>'. get_field('bevestiging_voorrijkosten', 'option') .'</span>
                </div>
            </div>
            <div class="pin">
                <span>'. get_field('bevestiging_pin_text', 'option') .'</span>
                <span>'. wp_get_attachment_image( get_field('pin_image', 'option'), 'full' ) .'</span>
            </div>
            <div class="tips">
                <p>'. get_field('bevestiging_tips_titel', 'option') .'</p>
                <span><svg width="14px" height="11px" viewBox="0 0 14 11" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>Icon Close Copy 2</title>
                <g id="Design" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Module-Stap-3-Spoed" transform="translate(-32.000000, -506.000000)" fill="#FFFFFF">
                        <g id="Icon-Close-Copy-2" transform="translate(32.000000, 506.176908)">
                            <polygon id="Fill-1" points="12.2590291 -5.68434189e-14 4.95696529 7.30124296 1.74179174 4.08606942 0 5.82621951 4.95696529 10.7831848 14 1.74015009"></polygon>
                        </g>
                    </g>
                </g>
            </svg>'. get_field('bevestiging_first_tip', 'option') .'</span>
                <span><svg width="14px" height="11px" viewBox="0 0 14 11" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>Icon Close Copy 2</title>
                <g id="Design" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Module-Stap-3-Spoed" transform="translate(-32.000000, -506.000000)" fill="#FFFFFF">
                        <g id="Icon-Close-Copy-2" transform="translate(32.000000, 506.176908)">
                            <polygon id="Fill-1" points="12.2590291 -5.68434189e-14 4.95696529 7.30124296 1.74179174 4.08606942 0 5.82621951 4.95696529 10.7831848 14 1.74015009"></polygon>
                        </g>
                    </g>
                </g>
            </svg>'. get_field('bevestiging_second_tip', 'option') .'</span>
                <span><svg width="14px" height="11px" viewBox="0 0 14 11" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>Icon Close Copy 2</title>
                <g id="Design" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Module-Stap-3-Spoed" transform="translate(-32.000000, -506.000000)" fill="#FFFFFF">
                        <g id="Icon-Close-Copy-2" transform="translate(32.000000, 506.176908)">
                            <polygon id="Fill-1" points="12.2590291 -5.68434189e-14 4.95696529 7.30124296 1.74179174 4.08606942 0 5.82621951 4.95696529 10.7831848 14 1.74015009"></polygon>
                        </g>
                    </g>
                </g>
            </svg>'. get_field('bevestiging_third_tip', 'option') .'</span>
                <span><svg width="14px" height="11px" viewBox="0 0 14 11" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>Icon Close Copy 2</title>
                <g id="Design" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Module-Stap-3-Spoed" transform="translate(-32.000000, -506.000000)" fill="#FFFFFF">
                        <g id="Icon-Close-Copy-2" transform="translate(32.000000, 506.176908)">
                            <polygon id="Fill-1" points="12.2590291 -5.68434189e-14 4.95696529 7.30124296 1.74179174 4.08606942 0 5.82621951 4.95696529 10.7831848 14 1.74015009"></polygon>
                        </g>
                    </g>
                </g>
            </svg>'. get_field('bevestiging_fourth_tip', 'option') .'</span>
            </div>
            <span>'. get_field('bevestiging_team_text', 'option') .'</span>
    ';
}

add_shortcode('form_confirmation', 'form_confirmation_shortcode');

/*
* Filter to populate label of consent field with custom text and link
*/

add_filter( 'gform_field_content', 'populate_tooltip', 10, 5 );

function populate_tooltip( $content, $field, $value, $lead_id, $form_id ) {
    if ( $form_id == 2 && $field->id == 17 ) {
        $terms = get_field('terms', 'option');
        $link = 'Ik ga akkoord met de <a href="'. $terms .'" target="_blank">algemene voorwaarden</a>';
        $content = str_replace  ( $field->label, $link , $content );
    }
    return $content;
}

add_filter( 'gform_field_content', 'populate_contact_html_field', 10, 5 );

function populate_contact_html_field( $content, $field, $value, $lead_id, $form_id ) {
    if ( $form_id == 6 && $field->id == 39 ) {
        $terms = get_field('footer_disclaimer', 'option');
        $link = $terms['footer_privacy_policy']['url'];
        $link = 'Met het verzenden van dit formulier ga je akkoord met onze <a href="'. $link .'" target="_blank">privacy verklaring</a>';
        $content = str_replace  ( $field->content, $link , $content );
    }
    return $content;
}

