<?php

function radicati_drupal_theme_form_system_theme_settings_alter(&$form, &$form_state) {
  $form['radicati_theme_settings'] = [
    '#type' => 'fieldset',
    '#title' => t('Radicati Settings'),
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
  ];

  $form['radicati_theme_settings']['radicati_theme_header_type'] = [
    '#type' => 'select',
    '#title' => t('Header Type'),
    '#description' => t('Select the type of header you want to use. Single line has all elements on one line, multi-line has the logo and site name on one side and two lines of menus next to it.'),
    '#options' => array(
      'single' => t('Single Line'),
      'multi' => t('Multi-Line'),
    ),
    '#default_value' => theme_get_setting('radicati_theme_header_type'),
  ];

  $form['radicati_theme_settings']['radicati_theme_header_sticky'] = [
    '#type' => 'checkbox',
    '#title' => t('Sticky Header'),
    '#description' => t('Check this box to make the header stick to the top of the page when scrolling.'),
    '#default_value' => theme_get_setting('radicati_theme_header_sticky'),
  ];

  $form['radicati_theme_settings']['radicati_theme_footer_type'] = [
    '#type' => 'select',
    '#title' => t('Footer Type'),
    '#description' => t('Select the type of footer you want to use. Single line is styled to have everything on one line, multi-line is styled to take up more vertical space.'),
    '#options' => array(
      'single' => t('Single Line'),
      'multi' => t('Multi-Line'),
    ),
    '#default_value' => theme_get_setting('radicati_theme_footer_type'),
  ];

  $form['radicati_theme_settings']['radicati_theme_footer_sticky'] = [
    '#type' => 'checkbox',
    '#title' => t('Sticky Footer'),
    '#description' => t('Check this box to make the footer stick to the bottom of the page when scrolling.'),
    '#default_value' => theme_get_setting('radicati_theme_footer_sticky'),
  ];
}