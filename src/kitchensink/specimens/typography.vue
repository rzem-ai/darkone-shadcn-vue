<script setup lang="ts">
import DarkOneTypography from '@/components/darkone/blocks/DarkOneTypography.vue';
import SpecimenRow from '../SpecimenRow.vue';
</script>

<template>
  <SpecimenRow label="Article">
    <DarkOneTypography class="max-w-2xl">
      <h1>Choosing a Sampler</h1>
      <p class="lead">The sampler decides how noise becomes an image. Pick it for the model and the step budget, not by habit.</p>
      <h2>What a Sampler Does</h2>
      <p>
        Each step, the sampler asks the model how much noise to remove and takes a step toward a cleaner image. Some take one careful step, some two
        cheaper ones; some add fresh noise back as they go. See the <a href="#">scheduler notes</a> for how the step sizes are spaced.
      </p>
      <blockquote>"If two samplers converge to the same image, the faster one is the right one."</blockquote>
      <h3>The Usual Candidates</h3>
      <ul>
        <li><code>euler</code>: fast and predictable, the safe default for Flux.</li>
        <li><code>euler_ancestral</code>: adds noise each step, so it keeps changing with more steps.</li>
        <li><code>dpmpp_2m</code>: sharp detail at 25 to 30 steps on SDXL.</li>
        <li><code>lcm</code>: four to eight steps, for turbo and LCM models only.</li>
      </ul>
      <h3>Measured on SDXL</h3>
      <table>
        <thead>
          <tr>
            <th>Sampler</th>
            <th align="right">Steps</th>
            <th align="right">Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>euler_ancestral</td>
            <td align="right">28</td>
            <td align="right">3:41</td>
          </tr>
          <tr>
            <td>dpmpp_2m</td>
            <td align="right">30</td>
            <td align="right">1:12</td>
          </tr>
          <tr>
            <td>dpmpp_2m_sde</td>
            <td align="right">35</td>
            <td align="right">4:22</td>
          </tr>
        </tbody>
      </table>
      <h4>Reproducibility</h4>
      <ol>
        <li>Fix the seed before comparing samplers.</li>
        <li>Change one setting at a time.</li>
        <li>Prefer a non-ancestral sampler when the result must repeat exactly.</li>
      </ol>
      <p class="muted">Times are from one RTX 4090 at 1024 by 1024. <small>Updated October 2026</small></p>
    </DarkOneTypography>
  </SpecimenRow>
</template>
