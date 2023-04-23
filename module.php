<?php

global $block;
// Step 1
$grid_title = get_field('grid_title', 'option');
$grid_clogs = get_field('grid_clogs', 'option');
$grid_footer = get_field('grid_footer', 'option');

/* 
    * Formulier
*/
$spoed_title = get_field('spoed_title', 'option');
$spoed_buttons = get_field('spoed_buttons', 'option');
$spoed_footer = get_field('spoed_footer', 'option');

$problem_title = get_field('probleem_title', 'option');

$contact_title = get_field('contact_title', 'option');

/* 
    * Spoed Melding
*/
$spoedmelding_title = get_field('spoedmelding_title', 'option');
$spoedmelding_text = get_field('spoedmelding_text', 'option');
$spoedmelding_tartieven_title = get_field('spoedmelding_tarieven_title', 'option');
$spoedmelding_tarieven = get_field('spoedmelding_tarieven', 'option');
$spoedmelding_tips_title = get_field('spoedmelding_tips_title', 'option');
$spoedmelding_tips = get_field('spoedmelding_tips', 'option');


?>


<section class="module">
    <div class="container">
        <?php partial('svg/loader'); ?>
        <div class="module-card module-step1">
            <div class="module-header">
                <?php if ($grid_title) : ?>
                    <h6><?= $grid_title; ?></h6>
                <?php endif; ?>
                <a class="module-close" href="javascript:void(0);"><?php partial('svg/icon-close'); ?></a>
            </div>
            <div class="module-body">
                <div class="grid">

                    <?php if ($grid_clogs) : ?>
                        <?php foreach ($grid_clogs as $clog) :
                            $clog_icon = $clog['icon'];
                            $clog_hover_icon = $clog['hover_icon'];
                            $clog_title = $clog['clog_title'];
                        ?>
                            <a href="javascript:void(0);" class="grid-item module-next-trigger choose-problem" id="<?php echo $clog_title ?>">
                                <?php echo wp_get_attachment_image($clog_icon, 'full') ?>
                                <?php echo wp_get_attachment_image($clog_hover_icon, 'full', "", ["class" => "hover-icon", "alt" => "hover-icon"]) ?>
                                <p><?php echo $clog_title ?></p>
                            </a>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </div>
            </div>
            <div class="footer align-center">
                <div class="footer-text">
                    <?= $grid_footer; ?>
                </div>
            </div>
        </div>

        <div class="module-card module-step-speed">
            <div class="module-header">
                <a class="module-speed-back" href="javascript:void(0);"><?php partial('svg/icon-back'); ?></a>
                <h6><?= $spoedmelding_title ?></h6>
                <a class="module-close" href="javascript:void(0);"><?php partial('svg/icon-close'); ?></a>
            </div>
            <div class="module-body">
                <div class="speed">
                    <div class="intro">
                        <?php if ($spoedmelding_text) : ?>
                            <?= $spoedmelding_text; ?>
                        <?php endif; ?>
                    </div>
                    <a href="" class="button module-button"><?php partial('svg/icon_phone') ?> Bel om een afspraak te maken</a>
                    <div class="prices">
                        <?php if ($spoedmelding_title) : ?>
                            <p><?= $spoedmelding_tartieven_title; ?></p>
                        <?php endif; ?>
                        <?php if ($spoedmelding_tarieven) : ?>
                            <?php foreach ($spoedmelding_tarieven as $tarief) :
                                $tarief_price = $tarief['tarieven_price'];
                                $tarief_text = $tarief['tarieven_tekst'];
                            ?>
                                <div class="price">
                                    <span><?php echo $tarief_text; ?></span>
                                    <span><?php echo $tarief_price; ?></span>
                                </div>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </div>
                    <div class="tips">
                        <?php if ($spoedmelding_tips_title) : ?>
                            <p><?= $spoedmelding_tips_title ?></p>
                        <?php endif; ?>
                        <?php if ($spoedmelding_tips) : ?>
                            <?php foreach ($spoedmelding_tips as $tip) :
                                $tip_text = $tip['tip_text'];
                            ?>
                                <span><?php partial('svg/icon_check') ?> <?php echo $tip_text ?></span>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>

        <div class="module-card module-step2">
            <div class="module-header">
                <a class="module-back" href="javascript:void(0);"><?php partial('svg/icon-back'); ?></a>
                <a class="module-back-form-page-3 hide" href="javascript:void(0);"><?php partial('svg/icon-back'); ?></a>
                <a class="module-back-form-page-2 hide" href="javascript:void(0);"><?php partial('svg/icon-back'); ?></a>
                <h6 id="form-page-1" class="module-title"><?= $spoed_title ?></h6>
                <h6 id="form-page-2" class="hide"><?= $problem_title ?></h6>
                <h6 id="form-page-3" class="hide"><?= $contact_title ?></h6>
                <a class="module-close" href="javascript:void(0);"><?php partial('svg/icon-close'); ?></a>
            </div>
            <div class="module-body">
                <div class="problem-type problem hide">
                </div>
                <div class="gf">
                    <?php gravity_form(2, false, false, false, '', true, 12); ?>
                    <div class="validate_field"></div>
                    <!-- <a class="manual-check">Check je postcode</a> -->
                </div>
                <div class="column column-form">

                    <p class="gf_title-spoed">Heeft het spoed?</p>
                    <?php if ($spoed_buttons) : ?>
                        <?php foreach ($spoed_buttons as $button) :
                            $button_title = $button['button_title'];
                            $button_subtitle = $button['button_subtitle'];
                            $button_class = $button['button_class'];
                        ?>
                            <a class="button speed-button <?php echo $button_class ?>">
                                <div class="text">
                                    <strong><?= $button_title ?></strong>
                                    <p><?= $button_subtitle ?></p>
                                </div>
                                <i class="" href="javascript:void(0);">
                                    <?php partial('svg/icon-next'); ?>
                                </i>
                            </a>
                        <?php endforeach; ?>
                    <?php endif; ?>
                    <?php partial('svg/loader') ?>
                </div>
                <div class="next-wrapper hide">
                    <a class="button next-button">
                        <?php partial('svg/icon-next');
                        ?>
                        <p>Ga verder</p>
                    </a>
                </div>
                <div class="submit-wrapper hide">
                    <a class="button submit-button">
                        <?php partial('svg/icon-next');
                        ?>
                        <p>Melding versturen</p>
                    </a>
                </div>
            </div>
            <div class="footer">
                <div class="form-footer">
                    <?= $spoed_footer ?>
                </div>
            </div>
        </div>
    </div>
</section>
