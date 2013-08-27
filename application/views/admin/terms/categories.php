<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/**
 * willog
 * Author:  willin
 * Created: 2013-08-16 22:38
 * File:    users.php
 */
?>

<form method="post" action="<?=base_url('/admin/categories/action/add')?>">
    <input type="hidden" name="<?= $this->security->get_csrf_token_name() ?>" value="<?= $this->security->get_csrf_hash() ?>" />

    <input name="t[slug]" placeholder="Slug">

    <?php foreach($langs as $lang):?>
        <input name="t[name][<?= $lang ?>]" placeholder="Name(<?= $lang ?>)">
    <?php endforeach;?>

    <select name="t[parent_id]">
        <option value="0">-</option>
        <?= $options ?>
    </select>

    <input name="t[desc]" maxlength="255" placeholder="Desc">

    <input type="submit">
</form>


    <table class="large-12 columns">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Slug</th>
                <th>Desc</th>
                <th>-</th>
            </tr>
        </thead>

        <tbody>
            <?= $categories ?>
        </tbody>
    </table>
