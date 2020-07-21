package com.msb.gateway.web.rest;

import com.msb.gateway.GatewayApp;
import com.msb.gateway.domain.ConfigCommon;
import com.msb.gateway.repository.ConfigCommonRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.msb.gateway.domain.enumeration.TypeConfig;
/**
 * Integration tests for the {@link ConfigCommonResource} REST controller.
 */
@SpringBootTest(classes = GatewayApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class ConfigCommonResourceIT {

    private static final Integer DEFAULT_ID_BOT = 1;
    private static final Integer UPDATED_ID_BOT = 2;

    private static final Boolean DEFAULT_ACTIVATED = false;
    private static final Boolean UPDATED_ACTIVATED = true;

    private static final TypeConfig DEFAULT_TYPE = TypeConfig.COMMAND;
    private static final TypeConfig UPDATED_TYPE = TypeConfig.EVENT;

    @Autowired
    private ConfigCommonRepository configCommonRepository;

    @Mock
    private ConfigCommonRepository configCommonRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restConfigCommonMockMvc;

    private ConfigCommon configCommon;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ConfigCommon createEntity(EntityManager em) {
        ConfigCommon configCommon = new ConfigCommon()
            .idBot(DEFAULT_ID_BOT)
            .activated(DEFAULT_ACTIVATED)
            .type(DEFAULT_TYPE);
        return configCommon;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ConfigCommon createUpdatedEntity(EntityManager em) {
        ConfigCommon configCommon = new ConfigCommon()
            .idBot(UPDATED_ID_BOT)
            .activated(UPDATED_ACTIVATED)
            .type(UPDATED_TYPE);
        return configCommon;
    }

    @BeforeEach
    public void initTest() {
        configCommon = createEntity(em);
    }

    @Test
    @Transactional
    public void createConfigCommon() throws Exception {
        int databaseSizeBeforeCreate = configCommonRepository.findAll().size();
        // Create the ConfigCommon
        restConfigCommonMockMvc.perform(post("/api/config-commons")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(configCommon)))
            .andExpect(status().isCreated());

        // Validate the ConfigCommon in the database
        List<ConfigCommon> configCommonList = configCommonRepository.findAll();
        assertThat(configCommonList).hasSize(databaseSizeBeforeCreate + 1);
        ConfigCommon testConfigCommon = configCommonList.get(configCommonList.size() - 1);
        assertThat(testConfigCommon.getIdBot()).isEqualTo(DEFAULT_ID_BOT);
        assertThat(testConfigCommon.isActivated()).isEqualTo(DEFAULT_ACTIVATED);
        assertThat(testConfigCommon.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    public void createConfigCommonWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = configCommonRepository.findAll().size();

        // Create the ConfigCommon with an existing ID
        configCommon.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restConfigCommonMockMvc.perform(post("/api/config-commons")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(configCommon)))
            .andExpect(status().isBadRequest());

        // Validate the ConfigCommon in the database
        List<ConfigCommon> configCommonList = configCommonRepository.findAll();
        assertThat(configCommonList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkIdBotIsRequired() throws Exception {
        int databaseSizeBeforeTest = configCommonRepository.findAll().size();
        // set the field null
        configCommon.setIdBot(null);

        // Create the ConfigCommon, which fails.


        restConfigCommonMockMvc.perform(post("/api/config-commons")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(configCommon)))
            .andExpect(status().isBadRequest());

        List<ConfigCommon> configCommonList = configCommonRepository.findAll();
        assertThat(configCommonList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkActivatedIsRequired() throws Exception {
        int databaseSizeBeforeTest = configCommonRepository.findAll().size();
        // set the field null
        configCommon.setActivated(null);

        // Create the ConfigCommon, which fails.


        restConfigCommonMockMvc.perform(post("/api/config-commons")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(configCommon)))
            .andExpect(status().isBadRequest());

        List<ConfigCommon> configCommonList = configCommonRepository.findAll();
        assertThat(configCommonList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = configCommonRepository.findAll().size();
        // set the field null
        configCommon.setType(null);

        // Create the ConfigCommon, which fails.


        restConfigCommonMockMvc.perform(post("/api/config-commons")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(configCommon)))
            .andExpect(status().isBadRequest());

        List<ConfigCommon> configCommonList = configCommonRepository.findAll();
        assertThat(configCommonList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllConfigCommons() throws Exception {
        // Initialize the database
        configCommonRepository.saveAndFlush(configCommon);

        // Get all the configCommonList
        restConfigCommonMockMvc.perform(get("/api/config-commons?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(configCommon.getId().intValue())))
            .andExpect(jsonPath("$.[*].idBot").value(hasItem(DEFAULT_ID_BOT)))
            .andExpect(jsonPath("$.[*].activated").value(hasItem(DEFAULT_ACTIVATED.booleanValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllConfigCommonsWithEagerRelationshipsIsEnabled() throws Exception {
        when(configCommonRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restConfigCommonMockMvc.perform(get("/api/config-commons?eagerload=true"))
            .andExpect(status().isOk());

        verify(configCommonRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllConfigCommonsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(configCommonRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restConfigCommonMockMvc.perform(get("/api/config-commons?eagerload=true"))
            .andExpect(status().isOk());

        verify(configCommonRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getConfigCommon() throws Exception {
        // Initialize the database
        configCommonRepository.saveAndFlush(configCommon);

        // Get the configCommon
        restConfigCommonMockMvc.perform(get("/api/config-commons/{id}", configCommon.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(configCommon.getId().intValue()))
            .andExpect(jsonPath("$.idBot").value(DEFAULT_ID_BOT))
            .andExpect(jsonPath("$.activated").value(DEFAULT_ACTIVATED.booleanValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingConfigCommon() throws Exception {
        // Get the configCommon
        restConfigCommonMockMvc.perform(get("/api/config-commons/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateConfigCommon() throws Exception {
        // Initialize the database
        configCommonRepository.saveAndFlush(configCommon);

        int databaseSizeBeforeUpdate = configCommonRepository.findAll().size();

        // Update the configCommon
        ConfigCommon updatedConfigCommon = configCommonRepository.findById(configCommon.getId()).get();
        // Disconnect from session so that the updates on updatedConfigCommon are not directly saved in db
        em.detach(updatedConfigCommon);
        updatedConfigCommon
            .idBot(UPDATED_ID_BOT)
            .activated(UPDATED_ACTIVATED)
            .type(UPDATED_TYPE);

        restConfigCommonMockMvc.perform(put("/api/config-commons")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedConfigCommon)))
            .andExpect(status().isOk());

        // Validate the ConfigCommon in the database
        List<ConfigCommon> configCommonList = configCommonRepository.findAll();
        assertThat(configCommonList).hasSize(databaseSizeBeforeUpdate);
        ConfigCommon testConfigCommon = configCommonList.get(configCommonList.size() - 1);
        assertThat(testConfigCommon.getIdBot()).isEqualTo(UPDATED_ID_BOT);
        assertThat(testConfigCommon.isActivated()).isEqualTo(UPDATED_ACTIVATED);
        assertThat(testConfigCommon.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingConfigCommon() throws Exception {
        int databaseSizeBeforeUpdate = configCommonRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restConfigCommonMockMvc.perform(put("/api/config-commons")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(configCommon)))
            .andExpect(status().isBadRequest());

        // Validate the ConfigCommon in the database
        List<ConfigCommon> configCommonList = configCommonRepository.findAll();
        assertThat(configCommonList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteConfigCommon() throws Exception {
        // Initialize the database
        configCommonRepository.saveAndFlush(configCommon);

        int databaseSizeBeforeDelete = configCommonRepository.findAll().size();

        // Delete the configCommon
        restConfigCommonMockMvc.perform(delete("/api/config-commons/{id}", configCommon.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ConfigCommon> configCommonList = configCommonRepository.findAll();
        assertThat(configCommonList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
